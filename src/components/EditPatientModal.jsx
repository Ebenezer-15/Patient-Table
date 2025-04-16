import Modal from "react-modal";
import Button from "./Button";

Modal.setAppElement("#root"); 

export default function EditPatientModal({ isOpen, onClose, patient, onSave }) {
  if (!patient) return null;

  const handleChange = field => e =>
    onSave({ ...patient, [field]: e.target.value });

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Edit Patient"
      className="bg-white rounded-xl p-6 max-w-md mx-auto mt-24 shadow-lg outline-none"
      overlayClassName="fixed inset-0 bg-black/40 flex justify-center items-start z-50"
    >
      <h2 className="text-xl font-semibold mb-4">Edit Patient</h2>
      <div className="space-y-3">
        <input
          className="w-full px-3 py-2 border rounded"
          value={patient.name}
          onChange={handleChange("name")}
          placeholder="Name"
        />
        <input
          type="number"
          className="w-full px-3 py-2 border rounded"
          value={patient.age}
          onChange={handleChange("age")}
          placeholder="Age"
        />
        <input
          className="w-full px-3 py-2 border rounded"
          value={patient.diagnosis}
          onChange={handleChange("diagnosis")}
          placeholder="Diagnosis"
        />
      </div>
      <div className="flex justify-end gap-3 mt-6">
        <Button variant="secondary" onClick={onClose}>
          Cancel
        </Button>
        <Button onClick={onClose}>Save</Button>
      </div>
    </Modal>
  );
}
