import { useEffect, useState } from "react";
import Button from "./Button";
import EditPatientModal from "./EditPatientModal";
import { toast } from "react-toastify";
import ViewPatientModal from "./ViewPatientModal";
import { EyeIcon, PencilSquareIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';


export default function PatientTable() {
  const [patients, setPatients] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [query, setQuery] = useState("");
  const [sortAsc, setSortAsc] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [editPatient, setEditPatient] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const patientsPerPage = 5;

  useEffect(() => {
    fetch("/patients.json")
      .then(res => res.json())
      .then(data => {
        setPatients(data);
        setFiltered(data);
      });
  }, []);

  const handleSearch = e => {
    const value = e.target.value.toLowerCase();
    setQuery(value);
    const filteredData = patients.filter(p =>
      p.name.toLowerCase().includes(value)
    );
    setFiltered(filteredData);
    setCurrentPage(1);
  };

  const sortByName = () => {
    const sorted = [...filtered].sort((a, b) =>
      sortAsc ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)
    );
    setFiltered(sorted);
    setSortAsc(!sortAsc);
  };

  const handleEdit = patient => {
    setEditPatient(patient);
    setIsOpen(true);
  };

const handleSave = updatedPatient => {
  const updated = patients.map(p =>
    p.id === updatedPatient.id ? updatedPatient : p
  );
  setPatients(updated);
  setFiltered(updated);
  toast.success("Patient record updated");
};
  
  const [viewPatient, setViewPatient] = useState(null);
  const [viewOpen, setViewOpen] = useState(false);

  const paginated = filtered.slice(
    (currentPage - 1) * patientsPerPage,
    currentPage * patientsPerPage
  );
  const totalPages = Math.ceil(filtered.length / patientsPerPage);

  return (
    <div className="p-6 max-w-7xl mx-auto bg-white rounded-lg shadow-md">
  <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
  <div className="relative w-full md:w-full sm:w-72">
    <MagnifyingGlassIcon className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
    <input
      type="text"
      value={query}
      onChange={handleSearch}
      placeholder="Search by name..."
      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-1 focus:ring-gray-300"
    />
  </div>
</div>


  <div className="overflow-x-auto border rounded-lg shadow-sm">
    <table className="min-w-full divide-y divide-gray-200 text-sm  text-gray-800">
      <thead className="text-white text-left bg-teal-900">
        <tr>
          <th
            className="p-3 font-bold  cursor-pointer"
            onClick={sortByName}
          >
            Patient Name {sortAsc ? "▲" : "▼"}
          </th>
          <th className="p-3 font-bold text-center">Age</th>
          <th className="p-3 font-bold text-center">Gender</th>
          <th className="p-3 font-bold">Diagnosis</th>
          <th className="p-3 font-bold">Admission Date</th>
          <th className="p-3 font-bold text-center">Actions</th>
        </tr>
      </thead>
      <tbody className="divide-y">
        {paginated.map(patient => (
          <tr key={patient.id} className="hover:bg-gray-50">
            <td className="p-3 font-semibold">{patient.name}</td>
            <td className="p-3 text-center font-semibold">{patient.age}</td>
            <td className="p-3 text-center font-semibold">{patient.gender}</td>
            <td className="p-3 font-semibold">{patient.diagnosis}</td>
            <td className="p-3 font-semibold">{patient.admissionDate}</td>
            <td className="p-3 font-semibold text-center space-x-2">
            <button
              onClick={() => {
                setViewPatient(patient);
                setViewOpen(true);
              }}
              className="inline-flex items-center justify-center w-9 h-9 text-gray-600 transition-colors"
              title="View"
            >
              <EyeIcon className="w-5 h-5" />
            </button>
            <button
              onClick={() => handleEdit(patient)}
              className="inline-flex items-center justify-center w-9 h-9 text-gray-600 transition-colors"
              title="Edit"
            >
              <PencilSquareIcon className="w-5 h-5" />
            </button>
          </td>

          </tr>
        ))}
      </tbody>
    </table>
  </div>

  <div className="flex justify-center sm:justify-end items-center gap-2 mt-6 flex-wrap">
  {/* Prev Button */}
  <button
    onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}
    disabled={currentPage === 1}
    className={`px-3 py-1.5 rounded-md border text-sm font-medium transition 
      ${currentPage === 1 
        ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
        : 'bg-white text-gray-700 hover:bg-gray-100 border-gray-300'}`}
  >
    Prev
  </button>

  {/* Page Numbers */}
  {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
    <button
      key={page}
      onClick={() => setCurrentPage(page)}
      className={`px-3 py-1.5 rounded-md text-sm font-medium border transition 
        ${currentPage === page 
          ? 'bg-teal-600 text-white ' 
          : 'bg-white text-gray-700 hover:bg-gray-100 border-gray-300'}`}
    >
      {page}
    </button>
  ))}

  {/* Next Button */}
  <button
    onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))}
    disabled={currentPage === totalPages}
    className={`px-3 py-1.5 rounded-md border text-sm font-medium transition 
      ${currentPage === totalPages 
        ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
        : 'bg-white text-gray-700 hover:bg-gray-100 border-gray-300'}`}
  >
    Next
  </button>
</div>


  <ViewPatientModal
    isOpen={viewOpen}
    onClose={() => setViewOpen(false)}
    patient={viewPatient}
  />

  <EditPatientModal
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  patient={editPatient}
  onSave={async (updated) => {
    await handleSave(updated); 
    setIsOpen(false);          
  }}
/>

</div>

  );

  
}
