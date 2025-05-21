import React, { useState } from "react";
import { motion } from "framer-motion";
import { Users, Plus, Search, Edit, Trash2 } from "lucide-react";
import { Layout } from "../components/common/Layout";
import { Card } from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { Table } from "../components/ui/Table";
import { Modal } from "../components/ui/Modal";
import { AdminForm } from "../components/admin/AdminForm";
import { Badge } from "../components/ui/Badge";
import { useAdminStore } from "../store/adminStore";
import { useFranchiseStore } from "../store/franchiseStore";

import { toast } from "react-toastify";

export const AdminListPage = () => {
  const { admins, addAdmin, updateAdmin, deleteAdmin } = useAdminStore();
  const { getFranchisesByAdminId } = useFranchiseStore();

  const [searchTerm, setSearchTerm] = useState("");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedAdmin, setSelectedAdmin] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredAdmins = admins.filter((admin) => {
    const searchValue = searchTerm.toLowerCase();
    return (
      admin.business_name?.toLowerCase().includes(searchValue) ||
      admin.contactPersonName?.toLowerCase().includes(searchValue) ||
      admin.email?.toLowerCase().includes(searchValue) ||
      admin.city?.toLowerCase().includes(searchValue) ||
      admin.state?.toLowerCase().includes(searchValue)
    );
  });

  const handleAddSubmit = (data) => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      addAdmin(data);
      setIsAddModalOpen(false);
      setIsLoading(false);
    }, 500);
  };

  const handleEditSubmit = (data) => {
    if (!selectedAdmin) return;

    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      updateAdmin(selectedAdmin.id, data);
      setIsEditModalOpen(false);
      setIsLoading(false);
      setSelectedAdmin(null);
    }, 500);
  };

  const handleDeleteConfirm = () => {
    if (!selectedAdmin) return;

    const associatedFranchises = getFranchisesByAdminId(selectedAdmin.id);
    if (associatedFranchises.length > 0) {
      toast.error("Cannot delete admin with associated franchises");
      setIsDeleteModalOpen(false);
      return;
    }

    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      deleteAdmin(selectedAdmin.id);
      setIsDeleteModalOpen(false);
      setIsLoading(false);
      setSelectedAdmin(null);
    }, 500);
  };

  const openEditModal = (admin) => {
    setSelectedAdmin(admin);
    setIsEditModalOpen(true);
  };

  const openDeleteModal = (admin) => {
    const associatedFranchises = getFranchisesByAdminId(admin.id);
    if (associatedFranchises.length > 0) {
      toast.error("Cannot delete admin with associated franchises");
      return;
    }
    setSelectedAdmin(admin);
    setIsDeleteModalOpen(true);
  };

  const getFranchiseCount = (adminId) => {
    return getFranchisesByAdminId(adminId).length;
  };

  return (
    <Layout>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Franchise Admins
            </h1>
            <p className="text-gray-600">Manage franchise administrators</p>
          </div>
          <Button
            onClick={() => setIsAddModalOpen(true)}
            icon={<Plus size={16} />}
            className="mt-4 sm:mt-0"
          >
            Add New Admin
          </Button>
        </div>

        <Card>
          <div className="mb-4">
            <Input
              placeholder="Search admins..."
              value={searchTerm}
              onChange={handleSearchChange}
              icon={<Search className="h-5 w-5 text-gray-400" />}
            />
          </div>

          <Table
            columns={[
              { header: "Business Name", accessor: "business_name" },
              { header: "Contact Person", accessor: "contact_person_name" },
              { header: "Email", accessor: "email" },
              { header: "Phone", accessor: "contact_person_mobile" },
              { header: "City", accessor: "city" },
              {
                header: "Commission",
                accessor: (item) => `${item.commission}%`,
              },
              {
                header: "Franchises",
                accessor: (item) => (
                  <Badge variant="primary">{getFranchiseCount(item.id)}</Badge>
                ),
              },
              {
                header: "Status",
                accessor: (item) => (
                  <Badge variant={item.is_active ? "success" : "error"}>
                    {item.is_active ? "Active" : "Inactive"}
                  </Badge>
                ),
              },
              {
                header: "Actions",
                accessor: (item) => (
                  <div className="flex space-x-2">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => openEditModal(item)}
                      icon={<Edit size={16} />}
                    />
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => openDeleteModal(item)}
                      icon={<Trash2 size={16} />}
                      disabled={getFranchiseCount(item.id) > 0}
                    />
                  </div>
                ),
              },
            ]}
            data={filteredAdmins}
            keyExtractor={(item) => item.id}
            emptyMessage="No admins found"
          />
        </Card>

        {/* Add Admin Modal */}
        <Modal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          title="Add New Admin"
          size="lg"
        >
          <AdminForm
            onSubmit={handleAddSubmit}
            onCancel={() => setIsAddModalOpen(false)}
            isLoading={isLoading}
          />
        </Modal>

        {/* Edit Admin Modal */}
        <Modal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          title="Edit Admin"
          size="lg"
        >
          {selectedAdmin && (
            <AdminForm
              initialData={selectedAdmin}
              onSubmit={handleEditSubmit}
              onCancel={() => setIsEditModalOpen(false)}
              isLoading={isLoading}
            />
          )}
        </Modal>

        {/* Delete Confirmation Modal */}
        <Modal
          isOpen={isDeleteModalOpen}
          onClose={() => setIsDeleteModalOpen(false)}
          title="Confirm Delete"
          size="sm"
        >
          <div className="mb-6">
            <p className="text-gray-700">
              Are you sure you want to delete{" "}
              <span className="font-medium">{selectedAdmin?.businessName}</span>
              ? This action cannot be undone.
            </p>
          </div>
          <div className="flex justify-end space-x-3">
            <Button
              variant="outline"
              onClick={() => setIsDeleteModalOpen(false)}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button
              variant="danger"
              onClick={handleDeleteConfirm}
              isLoading={isLoading}
            >
              Delete
            </Button>
          </div>
        </Modal>
      </motion.div>
    </Layout>
  );
};
