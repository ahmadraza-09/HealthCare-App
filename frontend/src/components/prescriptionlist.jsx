import React, { useEffect, useState } from "react";
import axios from "axios";
import { NotebookPen, X } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";

const PrescriptionList = () => {
  const [prescriptionData, setPrescriptionData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);

  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");

  const [addPrescriptionData, setAddPrescriptionData] = useState({
    patient_name: "",
    email: "",
    phone_number: "",
    date_of_birth: "",
    concern: "",
    address: "",
    message: "",
  });

  useEffect(() => {
    getPrescriptionList();
  }, []);

  const getPrescriptionList = () => {
    axios
      .get("http://localhost:3050/auth/showallprescription")
      .then((response) => {
        setPrescriptionData(response.data.message);
        setLoading(false);
      })
      .catch((error) => {
        setError("Error fetching prescription data");
        setLoading(false);
        console.error("Error fetching prescription data:", error);
      });
  };

  const handleAddPrescription = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        "http://localhost:3050/auth/addprescription",
        addPrescriptionData
      );
      setShowModal(false);
      getPrescriptionList();
      setAddPrescriptionData({
        patient_name: "",
        email: "",
        phone_number: "",
        date_of_birth: "",
        concern: "",
        address: "",
        message: "",
      });
      toast.success("Prescription Added Successfully");
    } catch (error) {
      console.error("Error:", error);
      toast.error("Error : Something happen !");
    }
  };

  const isToday = (date) => {
    const today = new Date();
    const d = new Date(date);
    return d.toDateString() === today.toDateString();
  };

  const isYesterday = (date) => {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const d = new Date(date);
    return d.toDateString() === yesterday.toDateString();
  };

  const filteredPrescriptions = prescriptionData
    .filter((prescription) => {
      if (filter === "today") return isToday(prescription.visit_date);
      if (filter === "yesterday") return isYesterday(prescription.visit_date);
      return true;
    })
    .filter(
      (prescription) =>
        prescription.patient_name
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        prescription.email.toLowerCase().includes(search.toLowerCase()) ||
        prescription.phone_number
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        prescription.concern.toLowerCase().includes(search.toLowerCase()) ||
        prescription.address.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => b.prescription_id - a.prescription_id);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-40 text-lg font-semibold text-blue-600 dark:text-blue-400">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-40 text-lg font-semibold text-red-500 dark:text-red-400">
        {error}
      </div>
    );
  }

  return (
    <div className="sm:p-6 p-4 bg-transparent min-h-screen relative dark:bg-gray-900">
      <Toaster />

      {/* Header with Filters */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
          Prescription List
        </h2>

        <div className="flex gap-3 sm:flex-row flex-col">
          {/* Search Bar */}
          <input
            type="text"
            placeholder="Search prescriptions..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border rounded px-3 py-2 shadow dark:bg-gray-800 dark:border-gray-700 dark:text-white"
          />

          {/* Dropdown Filter */}
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="border rounded px-3 py-2 shadow dark:bg-gray-800 dark:border-gray-700 dark:text-white"
          >
            <option value="all">All Prescriptions</option>
            <option value="today">Today</option>
            <option value="yesterday">Yesterday</option>
          </select>

          {/* Add Prescription Button */}
          <button
            onClick={() => setShowModal(true)}
            className="bg-white text-black dark:bg-blue-600 dark:text-white font-bold px-4 py-2 flex gap-2 items-center justify-center rounded-lg hover:opacity-90"
          >
            <NotebookPen size={20} color="red" /> Add Prescription
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-lg shadow border border-gray-200 dark:border-gray-700">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700 text-sm text-left">
          <thead className="bg-blue-600 text-white sticky top-0 z-10">
            <tr>
              {[
                "Name",
                "Email",
                "Phone Number",
                "Date of Birth",
                "Concern",
                "Address",
                "Message",
                "Visit Date",
              ].map((header) => (
                <th
                  key={header}
                  className="px-6 py-3 whitespace-nowrap font-semibold uppercase tracking-wider"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-100 dark:divide-gray-700">
            {filteredPrescriptions.map((prescription) => (
              <tr
                key={prescription.prescription_id}
                className="hover:bg-gray-50 dark:hover:bg-gray-700 even:bg-gray-50 dark:even:bg-gray-800"
              >
                <td className="px-6 py-4 truncate">
                  {prescription.patient_name}
                </td>
                <td
                  className="px-6 py-4 max-w-xs truncate"
                  title={prescription.email}
                >
                  {prescription.email}
                </td>
                <td className="px-6 py-4">{prescription.phone_number}</td>
                <td className="px-6 py-4">
                  {new Date(prescription.date_of_birth).toLocaleDateString(
                    "en-IN",
                    {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    }
                  )}
                </td>
                <td className="px-6 py-4">{prescription.concern}</td>
                <td
                  className="px-6 py-4 max-w-xs truncate"
                  title={prescription.address}
                >
                  {prescription.address}
                </td>
                <td
                  className="px-6 py-4 max-w-xs truncate"
                  title={prescription.message}
                >
                  {prescription.message}
                </td>
                <td className="px-6 py-4 truncate">
                  {new Date(prescription.visit_date).toLocaleDateString(
                    "en-IN",
                    {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    }
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add Prescription Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-20">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-xl shadow-lg relative">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-black dark:hover:text-white"
            >
              <X size={22} />
            </button>

            <h3 className="text-xl font-bold mb-4 text-gray-800 dark:text-gray-100">
              Add Prescription
            </h3>

            <form
              className="grid grid-cols-1 gap-4"
              onSubmit={handleAddPrescription}
            >
              {/* Patient Name & Email */}
              <div className="flex gap-4">
                <div className="w-full">
                  <label className="text-sm font-semibold dark:text-gray-200">
                    Patient Name
                  </label>
                  <input
                    type="text"
                    placeholder="Patient Name"
                    value={addPrescriptionData.patient_name}
                    required
                    onChange={(e) =>
                      setAddPrescriptionData({
                        ...addPrescriptionData,
                        patient_name: e.target.value,
                      })
                    }
                    className="border rounded px-4 py-2 w-full dark:bg-gray-900 dark:border-gray-700 dark:text-white"
                  />
                </div>
                <div className="w-full">
                  <label className="text-sm font-semibold dark:text-gray-200">
                    Patient Email
                  </label>
                  <input
                    type="email"
                    placeholder="Email"
                    value={addPrescriptionData.email}
                    onChange={(e) =>
                      setAddPrescriptionData({
                        ...addPrescriptionData,
                        email: e.target.value,
                      })
                    }
                    className="border rounded px-4 py-2 w-full dark:bg-gray-900 dark:border-gray-700 dark:text-white"
                  />
                </div>
              </div>

              {/* Phone Number & DOB */}
              <div className="flex gap-4">
                <div className="w-full">
                  <label className="text-sm font-semibold dark:text-gray-200">
                    Patient Phone Number
                  </label>
                  <input
                    type="tel"
                    placeholder="Phone Number"
                    required
                    value={addPrescriptionData.phone_number}
                    onChange={(e) =>
                      setAddPrescriptionData({
                        ...addPrescriptionData,
                        phone_number: e.target.value,
                      })
                    }
                    className="border rounded px-4 py-2 w-full dark:bg-gray-900 dark:border-gray-700 dark:text-white"
                  />
                </div>
                <div className="w-full">
                  <label className="text-sm font-semibold dark:text-gray-200">
                    Patient Date of Birth
                  </label>
                  <input
                    type="date"
                    placeholder="Date Of Birth"
                    required
                    value={addPrescriptionData.date_of_birth}
                    onChange={(e) =>
                      setAddPrescriptionData({
                        ...addPrescriptionData,
                        date_of_birth: e.target.value,
                      })
                    }
                    className="border rounded px-4 py-2 w-full dark:bg-gray-900 dark:border-gray-700 dark:text-white"
                  />
                </div>
              </div>

              {/* Concern & Address */}
              <div className="flex gap-4">
                <div className="w-full">
                  <label className="text-sm font-semibold dark:text-gray-200">
                    Patient Concern
                  </label>
                  <input
                    type="text"
                    placeholder="Concern"
                    required
                    value={addPrescriptionData.concern}
                    onChange={(e) =>
                      setAddPrescriptionData({
                        ...addPrescriptionData,
                        concern: e.target.value,
                      })
                    }
                    className="border rounded px-4 py-2 w-full dark:bg-gray-900 dark:border-gray-700 dark:text-white"
                  />
                </div>
                <div className="w-full">
                  <label className="text-sm font-semibold dark:text-gray-200">
                    Patient Address
                  </label>
                  <input
                    type="text"
                    placeholder="Address"
                    required
                    value={addPrescriptionData.address}
                    onChange={(e) =>
                      setAddPrescriptionData({
                        ...addPrescriptionData,
                        address: e.target.value,
                      })
                    }
                    className="border rounded px-4 py-2 w-full dark:bg-gray-900 dark:border-gray-700 dark:text-white"
                  />
                </div>
              </div>

              {/* Treatment & Medicines */}
              <div className="flex flex-col">
                <label className="text-sm font-semibold dark:text-gray-200">
                  Doctor Treatment & Medicines
                </label>
                <textarea
                  placeholder="Write message, treatments & medicines"
                  value={addPrescriptionData.message}
                  onChange={(e) =>
                    setAddPrescriptionData({
                      ...addPrescriptionData,
                      message: e.target.value,
                    })
                  }
                  className="border rounded px-4 py-2 max-w-full dark:bg-gray-900 dark:border-gray-700 dark:text-white"
                />
              </div>

              <button
                type="submit"
                className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
              >
                Save
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default PrescriptionList;
