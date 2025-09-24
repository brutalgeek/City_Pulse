import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar, MapPin, User, Mail, AlertCircle, Trash2, Edit } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

const IssueDetailsModal = ({ issue, isOpen, onClose, onStatusChange, onDelete }) => {
  const { isAdmin } = useAuth();
  const [showReasonModal, setShowReasonModal] = useState(false);
  const [actionType, setActionType] = useState(''); // 'status' or 'delete'
  const [newStatus, setNewStatus] = useState('');
  const [reason, setReason] = useState('');

  const statusOptions = {
    1: { label: 'Open', color: 'bg-blue-100 text-blue-800' },
    2: { label: 'In Progress', color: 'bg-yellow-100 text-yellow-800' },
    3: { label: 'Under Review', color: 'bg-orange-100 text-orange-800' },
    4: { label: 'Resolved', color: 'bg-green-100 text-green-800' }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High': return 'bg-red-100 text-red-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleStatusChange = (status) => {
    setNewStatus(status);
    setActionType('status');
    setShowReasonModal(true);
  };

  const handleDeleteClick = () => {
    setActionType('delete');
    setShowReasonModal(true);
  };

  const handleConfirmAction = () => {
    if (!reason.trim()) {
      alert('Please provide a reason for this action');
      return;
    }

    if (actionType === 'status') {
      onStatusChange(issue.id, newStatus, reason);
    } else if (actionType === 'delete') {
      onDelete(issue.id, reason);
    }

    // Reset state
    setShowReasonModal(false);
    setReason('');
    setActionType('');
    setNewStatus('');
    onClose();
  };

  if (!issue) return null;

  return (
    <>
      {/* Main Issue Details Modal */}
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-blue-600" />
              Issue Details
            </DialogTitle>
            <DialogDescription>
              Detailed information about the reported civic issue
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6">
            {/* Issue Image */}
            {issue.image && (
              <div className="w-full">
                <img 
                  src={issue.image} 
                  alt="Issue" 
                  className="w-full h-64 object-cover rounded-lg border"
                />
              </div>
            )}

            {/* Issue Title & Description */}
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{issue.title}</h3>
              <p className="text-gray-600 mb-4">{issue.description}</p>
              
              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                <Badge className={`${getPriorityColor(issue.priority)}`}>
                  {issue.priority} Priority
                </Badge>
                <Badge className={`${statusOptions[issue.status]?.color || 'bg-gray-100 text-gray-800'}`}>
                  {statusOptions[issue.status]?.label || 'Unknown Status'}
                </Badge>
                <Badge variant="outline">
                  {issue.category}
                </Badge>
              </div>
            </div>

            {/* Issue Details Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4 text-gray-500" />
                  <div>
                    <p className="text-sm text-gray-500">Reporter</p>
                    <p className="font-medium">{issue.reportedBy}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-gray-500" />
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <p className="font-medium">{issue.reporterEmail || 'reporter@example.com'}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-gray-500" />
                  <div>
                    <p className="text-sm text-gray-500">Reported On</p>
                    <p className="font-medium">{issue.reportedDate}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-gray-500" />
                  <div>
                    <p className="text-sm text-gray-500">Location</p>
                    <p className="font-medium">{issue.location || 'Location not specified'}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Admin Actions */}
            {isAdmin() && (
              <div className="border-t pt-4">
                <h4 className="font-semibold text-gray-900 mb-4">Admin Actions</h4>
                <div className="space-y-4">
                  {/* Status Change */}
                  <div>
                    <Label className="text-sm font-medium mb-2 block">Change Status</Label>
                    <div className="flex flex-wrap gap-2">
                      {Object.entries(statusOptions).map(([statusId, statusInfo]) => (
                        <Button
                          key={statusId}
                          variant="outline"
                          size="sm"
                          onClick={() => handleStatusChange(statusId)}
                          className={`${statusInfo.color} border-current`}
                        >
                          <Edit className="w-4 h-4 mr-1" />
                          {statusInfo.label}
                        </Button>
                      ))}
                    </div>
                  </div>

                  {/* Delete Action */}
                  <div>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={handleDeleteClick}
                      className="flex items-center gap-2"
                    >
                      <Trash2 className="w-4 h-4" />
                      Delete Issue
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={onClose}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Reason Modal */}
      <Dialog open={showReasonModal} onOpenChange={setShowReasonModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {actionType === 'delete' ? 'Delete Issue' : 'Change Status'}
            </DialogTitle>
            <DialogDescription>
              Please provide a reason for this action. This will be sent to the reporter via email.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div>
              <Label htmlFor="reason">Reason</Label>
              <Textarea
                id="reason"
                placeholder={`Explain why you are ${actionType === 'delete' ? 'deleting this issue' : 'changing the status'}...`}
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                rows={4}
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowReasonModal(false)}>
              Cancel
            </Button>
            <Button 
              onClick={handleConfirmAction}
              variant={actionType === 'delete' ? 'destructive' : 'default'}
            >
              {actionType === 'delete' ? 'Delete Issue' : 'Change Status'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default IssueDetailsModal;