import PatientTable from "../components/PatientTable";

export default function PatientsPage() {
  return (
    <div className="p-6 bg-teal-300 text-teal-900">
      <h1 className=" text-center text-2xl font-bold mb-4 bg-white rounded-lg shadow-md p-6 max-w-7xl mx-auto">Patient Records.</h1>
      <PatientTable />
    </div>
  );
}