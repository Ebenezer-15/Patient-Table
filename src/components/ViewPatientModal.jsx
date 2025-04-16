import Modal from "react-modal";
import Button from "./Button";

Modal.setAppElement("#root");

export default function ViewPatientModal({ isOpen, onClose, patient }) {
  if (!patient) return null;

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Patient Details"
      className="bg-white rounded-xl p-6 max-w-md mx-auto mt-24 shadow-lg outline-none"
      overlayClassName="fixed inset-0 bg-black/40 flex justify-center items-start z-50"
    >
      <h2 className="text-xl font-semibold mb-4">Patient Details</h2>
      <div className="space-y-2 text-sm text-gray-800">
        <p><strong>Name:</strong> {patient.name}</p>
        <p><strong>Age:</strong> {patient.age}</p>
        <p><strong>Gender:</strong> {patient.gender}</p>
        <p><strong>Diagnosis:</strong> {patient.diagnosis}</p>
        <p><strong>Admission Date:</strong> {patient.admissionDate}</p>
      </div>
      <div className="flex justify-end mt-6">
        <Button variant="secondary" onClick={onClose}>Close</Button>
      </div>
    </Modal>
  );
}
