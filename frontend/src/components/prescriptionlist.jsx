import React, { useEffect, useState } from "react";
import axios from "axios";
import { Pen, X } from "lucide-react";
import { toast } from "react-toastify";

const PrescriptionList = () => {
  const [prescriptionData, setPrescriptionData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false); // ✅ Modal toggle

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

  if (loading) {
    return (
      <div className="flex items-center justify-center h-40 text-lg font-semibold text-blue-600">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-40 text-lg font-semibold text-red-500">
        {error}
      </div>
    );
  }

  const handleAddPrescription = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3050/auth/addprescription",
        addPrescriptionData
      );
      setShowModal(false);

      console.log(response.data.message);

      toast.success("Prescription Added Successfully");
    } catch (error) {
      console.error("Error:", error);
      toast.error("Error : Something happen !");
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen relative">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Prescription List</h2>
        <button
          onClick={() => setShowModal(true)} // ✅ Open modal
          className="bg-blue-600 text-white font-bold px-4 py-2 flex gap-2 items-center justify-center rounded-lg"
        >
          <Pen size={20} /> Add Prescription
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-lg shadow border border-gray-200">
        <table className="min-w-full divide-y divide-gray-200 text-sm text-left">
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
          <tbody className="bg-white divide-y divide-gray-100">
            {[...prescriptionData]
              .sort((a, b) => b.prescription_id - a.prescription_id)
              .map((prescription) => (
                <tr
                  key={prescription.prescription_id}
                  className="hover:bg-gray-50 even:bg-gray-50"
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

      {/* ✅ Form Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-20">
          <div className="bg-white rounded-lg p-6 w-full max-w-xl shadow-lg relative">
            {/* Close Button */}
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-black"
            >
              <X size={22} />
            </button>

            <h3 className="text-xl font-bold mb-4 text-gray-800">
              Add Prescription
            </h3>

            <form
              className="grid grid-cols-1 gap-4"
              onSubmit={handleAddPrescription}
            >
              {/* Add your form fields here */}
              <div className="flex gap-4">
                <div>
                  <label className="text-sm font-semibold">Patient Name</label>
                  <input
                    type="text"
                    placeholder="Patient Name"
                    value={addPrescriptionData.patient_name}
                    onChange={(e) =>
                      setAddPrescriptionData({
                        ...addPrescriptionData,
                        patient_name: e.target.value,
                      })
                    }
                    className="border rounded px-4 py-2 w-full"
                  />
                </div>
                <div>
                  <label className="text-sm font-semibold">Patient Email</label>
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
                    className="border rounded px-4 py-2 w-full"
                  />
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-full">
                  <label className="text-sm font-semibold">
                    Patient Phone Number
                  </label>
                  <input
                    type="tel"
                    placeholder="Phone Number"
                    value={addPrescriptionData.phone_number}
                    onChange={(e) =>
                      setAddPrescriptionData({
                        ...addPrescriptionData,
                        phone_number: e.target.value,
                      })
                    }
                    className="border rounded px-4 py-2 w-full"
                  />
                </div>
                <div className="w-full">
                  <label className="text-sm font-semibold">
                    Patient Date of Birth
                  </label>
                  <input
                    type="date"
                    placeholder="Date Of Birth"
                    value={addPrescriptionData.date_of_birth}
                    onChange={(e) =>
                      setAddPrescriptionData({
                        ...addPrescriptionData,
                        date_of_birth: e.target.value,
                      })
                    }
                    className="border rounded px-4 py-2 w-full"
                  />
                </div>
              </div>
              <div className="flex gap-4">
                <div>
                  <label className="text-sm font-semibold">
                    Patient Concern
                  </label>
                  <input
                    type="text"
                    placeholder="Concern"
                    value={addPrescriptionData.concern}
                    onChange={(e) =>
                      setAddPrescriptionData({
                        ...addPrescriptionData,
                        concern: e.target.value,
                      })
                    }
                    className="border rounded px-4 py-2 w-full"
                  />
                </div>
                <div>
                  <label className="text-sm font-semibold">
                    Patient Address
                  </label>
                  <input
                    type="text"
                    placeholder="Address"
                    value={addPrescriptionData.address}
                    onChange={(e) =>
                      setAddPrescriptionData({
                        ...addPrescriptionData,
                        address: e.target.value,
                      })
                    }
                    className="border rounded px-4 py-2 w-full"
                  />
                </div>
              </div>

              <div className="flex flex-col">
                <label className="text-sm font-semibold">
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
                  className="border rounded px-4 py-2 max-w-full"
                />
              </div>
              {/* Add other fields as needed */}
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
