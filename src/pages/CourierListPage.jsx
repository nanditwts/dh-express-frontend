import React, { useState } from "react";
import { motion } from "framer-motion";
import { Truck, Plus, Search, Edit, Trash2 } from "lucide-react";
import { Layout } from "../components/common/Layout";
import { Card } from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { Table } from "../components/ui/Table";
import { Modal } from "../components/ui/Modal";
import { CourierForm } from "../components/courier/CourierForm";
import { Badge } from "../components/ui/Badge";
import { useCourierStore } from "../store/courierStore";
import { useChannelStore } from "../store/channelStore";

import { toast } from "react-toastify";

export const CourierListPage = () => {
  const { couriers, addCourier, updateCourier, deleteCourier } =
    useCourierStore();
  const { getChannelsByCourierId } = useChannelStore();

  const [searchTerm, setSearchTerm] = useState("");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedCourier, setSelectedCourier] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredCouriers = couriers.filter((courier) => {
    const searchValue = searchTerm.toLowerCase();
    return courier.name.toLowerCase().includes(searchValue);
  });

  const handleAddSubmit = (data) => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      addCourier(data);
      setIsAddModalOpen(false);
      setIsLoading(false);
    }, 500);
  };

  const handleEditSubmit = (data) => {
    if (!selectedCourier) return;

    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      updateCourier(selectedCourier.id, data);
      setIsEditModalOpen(false);
      setIsLoading(false);
      setSelectedCourier(null);
    }, 500);
  };

  const handleDeleteConfirm = () => {
    if (!selectedCourier) return;

    const associatedChannels = getChannelsByCourierId(selectedCourier.id);
    if (associatedChannels.length > 0) {
      toast.error("Cannot delete courier with associated channels");
      setIsDeleteModalOpen(false);
      return;
    }

    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      deleteCourier(selectedCourier.id);
      setIsDeleteModalOpen(false);
      setIsLoading(false);
      setSelectedCourier(null);
    }, 500);
  };

  const openEditModal = (courier) => {
    setSelectedCourier(courier);
    setIsEditModalOpen(true);
  };

  const openDeleteModal = (courier) => {
    const associatedChannels = getChannelsByCourierId(courier.id);
    if (associatedChannels.length > 0) {
      toast.error("Cannot delete courier with associated channels");
      return;
    }
    setSelectedCourier(courier);
    setIsDeleteModalOpen(true);
  };

  const getChannelCount = (courierId) => {
    return getChannelsByCourierId(courierId).length;
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
            <h1 className="text-2xl font-bold text-gray-900">Couriers</h1>
            <p className="text-gray-600">Manage courier partners</p>
          </div>
          <Button
            onClick={() => setIsAddModalOpen(true)}
            icon={<Plus size={16} />}
            className="mt-4 sm:mt-0"
          >
            Add New Courier
          </Button>
        </div>

        <Card>
          <div className="mb-4">
            <Input
              placeholder="Search couriers..."
              value={searchTerm}
              onChange={handleSearchChange}
              icon={<Search className="h-5 w-5 text-gray-400" />}
            />
          </div>

          <Table
            columns={[
              {
                header: "Logo",
                accessor: (item) => (
                  <img
                    src={item.logo}
                    alt={item.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                ),
                className: "w-20",
              },
              { header: "Name", accessor: "name" },
              {
                header: "Channels",
                accessor: (item) => (
                  <Badge variant="primary">{getChannelCount(item.id)}</Badge>
                ),
              },
              {
                header: "Status",
                accessor: (item) => (
                  <Badge variant={item.isActive ? "success" : "error"}>
                    {item.isActive ? "Active" : "Inactive"}
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
                      disabled={getChannelCount(item.id) > 0}
                    />
                  </div>
                ),
              },
            ]}
            data={filteredCouriers}
            keyExtractor={(item) => item.id}
            emptyMessage="No couriers found"
          />
        </Card>

        {/* Add Courier Modal */}
        <Modal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          title="Add New Courier"
          size="lg"
        >
          <CourierForm
            onSubmit={handleAddSubmit}
            onCancel={() => setIsAddModalOpen(false)}
            isLoading={isLoading}
          />
        </Modal>

        {/* Edit Courier Modal */}
        <Modal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          title="Edit Courier"
          size="lg"
        >
          {selectedCourier && (
            <CourierForm
              initialData={selectedCourier}
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
              <span className="font-medium">{selectedCourier?.name}</span>? This
              action cannot be undone.
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
