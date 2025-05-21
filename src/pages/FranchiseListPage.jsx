import React, { useState } from "react";
import { motion } from "framer-motion";
import { Building2, Plus, Search, Edit, Trash2 } from "lucide-react";
import { Layout } from "../components/common/Layout";
import { Card } from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { Table } from "../components/ui/Table";
import { Modal } from "../components/ui/Modal";
import { FranchiseForm } from "../components/franchise/FranchiseForm";
import { Badge } from "../components/ui/Badge";
import { useFranchiseStore } from "../store/franchiseStore";
import { useAdminStore } from "../store/adminStore";

export const FranchiseListPage = () => {
  const { franchises, addFranchise, updateFranchise, deleteFranchise } =
    useFranchiseStore();
  const { admins, getAdminById } = useAdminStore();

  const [searchTerm, setSearchTerm] = useState("");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedFranchise, setSelectedFranchise] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredFranchises = franchises.filter((franchise) => {
    const searchValue = searchTerm.toLowerCase();
    return (
      franchise.franchise_name.toLowerCase().includes(searchValue) ||
      franchise.contact_person_name.toLowerCase().includes(searchValue) ||
      franchise.city.toLowerCase().includes(searchValue) ||
      franchise.state.toLowerCase().includes(searchValue) ||
      franchise.gst_number.toLowerCase().includes(searchValue)
    );
  });

  const handleAddSubmit = (data) => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      addFranchise(data);
      setIsAddModalOpen(false);
      setIsLoading(false);
    }, 500);
  };

  const handleEditSubmit = (data) => {
    if (!selectedFranchise) return;

    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      updateFranchise(selectedFranchise.id, data);
      setIsEditModalOpen(false);
      setIsLoading(false);
      setSelectedFranchise(null);
    }, 500);
  };

  const handleDeleteConfirm = () => {
    if (!selectedFranchise) return;

    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      deleteFranchise(selectedFranchise.id);
      setIsDeleteModalOpen(false);
      setIsLoading(false);
      setSelectedFranchise(null);
    }, 500);
  };

  const openEditModal = (franchise) => {
    setSelectedFranchise(franchise);
    setIsEditModalOpen(true);
  };

  const openDeleteModal = (franchise) => {
    setSelectedFranchise(franchise);
    setIsDeleteModalOpen(true);
  };

  const getAdminName = (adminId) => {
    const admin = getAdminById(adminId);
    return admin ? admin.businessName : "N/A";
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
            <h1 className="text-2xl font-bold text-gray-900">Franchises</h1>
            <p className="text-gray-600">Manage your franchise network</p>
          </div>
          <Button
            onClick={() => setIsAddModalOpen(true)}
            icon={<Plus size={16} />}
            className="mt-4 sm:mt-0"
          >
            Add New Franchise
          </Button>
        </div>

        <Card>
          <div className="mb-4">
            <Input
              placeholder="Search franchises..."
              value={searchTerm}
              onChange={handleSearchChange}
              icon={<Search className="h-5 w-5 text-gray-400" />}
            />
          </div>

          <Table
            columns={[
              { header: "Franchise Name", accessor: "franchiseName" },
              {
                header: "Admin",
                accessor: (item) => getAdminName(item.adminId),
              },
              { header: "Contact Person", accessor: "contactPersonName" },
              { header: "City", accessor: "city" },
              {
                header: "Commission",
                accessor: (item) => `${item.commission}%`,
              },
              {
                header: "KYC Status",
                accessor: (item) => (
                  <Badge
                    variant={
                      item.kycStatus === "Approved" ? "success" : "warning"
                    }
                  >
                    {item.kycStatus}
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
                    />
                  </div>
                ),
              },
            ]}
            data={filteredFranchises}
            keyExtractor={(item) => item.id}
            emptyMessage="No franchises found"
          />
        </Card>

        {/* Add Franchise Modal */}
        <Modal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          title="Add New Franchise"
          size="lg"
        >
          <FranchiseForm
            onSubmit={handleAddSubmit}
            onCancel={() => setIsAddModalOpen(false)}
            isLoading={isLoading}
          />
        </Modal>

        {/* Edit Franchise Modal */}
        <Modal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          title="Edit Franchise"
          size="lg"
        >
          {selectedFranchise && (
            <FranchiseForm
              initialData={selectedFranchise}
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
              <span className="font-medium">
                {selectedFranchise?.franchiseName}
              </span>
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
