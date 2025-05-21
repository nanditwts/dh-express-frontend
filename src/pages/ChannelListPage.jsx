import React, { useState } from "react";
import { motion } from "framer-motion";
import { Share2, Plus, Search, Edit, Trash2 } from "lucide-react";
import { Layout } from "../components/common/Layout";
import { Card } from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { Table } from "../components/ui/Table";
import { Modal } from "../components/ui/Modal";
import { ChannelForm } from "../components/channel/ChannelForm";
import { Badge } from "../components/ui/Badge";
import { useChannelStore } from "../store/channelStore";
import { useCourierStore } from "../store/courierStore";

export const ChannelListPage = () => {
  const { channels, addChannel, updateChannel, deleteChannel } =
    useChannelStore();
  const { getCourierById } = useCourierStore();

  const [searchTerm, setSearchTerm] = useState("");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedChannel, setSelectedChannel] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredChannels = channels.filter((channel) => {
    const searchValue = searchTerm.toLowerCase();
    const courier = getCourierById(channel.courierId);
    return (
      channel.businessName.toLowerCase().includes(searchValue) ||
      courier?.name.toLowerCase().includes(searchValue) ||
      channel.type.toLowerCase().includes(searchValue)
    );
  });

  const handleAddSubmit = (data) => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      addChannel(data);
      setIsAddModalOpen(false);
      setIsLoading(false);
    }, 500);
  };

  const handleEditSubmit = (data) => {
    if (!selectedChannel) return;

    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      updateChannel(selectedChannel.id, data);
      setIsEditModalOpen(false);
      setIsLoading(false);
      setSelectedChannel(null);
    }, 500);
  };

  const handleDeleteConfirm = () => {
    if (!selectedChannel) return;

    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      deleteChannel(selectedChannel.id);
      setIsDeleteModalOpen(false);
      setIsLoading(false);
      setSelectedChannel(null);
    }, 500);
  };

  const openEditModal = (channel) => {
    setSelectedChannel(channel);
    setIsEditModalOpen(true);
  };

  const openDeleteModal = (channel) => {
    setSelectedChannel(channel);
    setIsDeleteModalOpen(true);
  };

  const getCourierName = (courierId) => {
    const courier = getCourierById(courierId);
    return courier ? courier.name : "N/A";
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
            <h1 className="text-2xl font-bold text-gray-900">Channels</h1>
            <p className="text-gray-600">Manage courier channels</p>
          </div>
          <Button
            onClick={() => setIsAddModalOpen(true)}
            icon={<Plus size={16} />}
            className="mt-4 sm:mt-0"
          >
            Add New Channel
          </Button>
        </div>

        <Card>
          <div className="mb-4">
            <Input
              placeholder="Search channels..."
              value={searchTerm}
              onChange={handleSearchChange}
              icon={<Search className="h-5 w-5 text-gray-400" />}
            />
          </div>

          <Table
            columns={[
              {
                header: "Courier",
                accessor: (item) => getCourierName(item.courierId),
              },
              { header: "Business Name", accessor: "businessName" },
              {
                header: "Type",
                accessor: (item) => (
                  <Badge
                    variant={item.type === "B2B" ? "primary" : "secondary"}
                  >
                    {item.type}
                  </Badge>
                ),
              },
              { header: "API Key", accessor: "apiKey" },
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
                    />
                  </div>
                ),
              },
            ]}
            data={filteredChannels}
            keyExtractor={(item) => item.id}
            emptyMessage="No channels found"
          />
        </Card>

        {/* Add Channel Modal */}
        <Modal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          title="Add New Channel"
          size="lg"
        >
          <ChannelForm
            onSubmit={handleAddSubmit}
            onCancel={() => setIsAddModalOpen(false)}
            isLoading={isLoading}
          />
        </Modal>

        {/* Edit Channel Modal */}
        <Modal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          title="Edit Channel"
          size="lg"
        >
          {selectedChannel && (
            <ChannelForm
              initialData={selectedChannel}
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
              Are you sure you want to delete this channel for{" "}
              <span className="font-medium">
                {selectedChannel?.businessName}
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
