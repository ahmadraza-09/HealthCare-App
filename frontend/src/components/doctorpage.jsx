import React from "react";
import "../css/doctorpage.css";

const DoctorPage = () => {
  return (
    <div className="doctor-page">
      <div className="doctor-page-image">
        <img src="images/doctor.png" alt="Dr. Jhonsen profile photo" />
      </div>

      <div className="doctor-page-content">
        <h2 className="name">Dr. Jhonsen</h2>
        <div className="qualification">MBBS</div>
        <div className="experience">10+ Years Experience</div>
        <ul className="specialist">
          <li>Cardiologist</li>
          <li>Neurologist</li>
          <li>Oncologist</li>
        </ul>
        <p>
          Dr. Jhonsen, a distinguished medical professional with over a decade
          of invaluable experience, stands as a beacon of expertise and
          compassion in the realm of healthcare. Graduating with flying colors
          from a prestigious medical institution, Dr. Jhonsen embarked on a
          journey marked by unwavering dedication and an insatiable quest for
          excellence.
        </p>
        <p>
          With an MBBS degree, he specializes in Cardiology, Neurology, and
          Oncology. He addresses diverse medical challenges with finesse and
          precision, employing modern diagnostics and treatments.
        </p>
        <p>
          In Cardiology, he ensures heart health with precision. In Neurology,
          he navigates the complexities of the nervous system. As an Oncologist,
          he offers unwavering support to cancer patients.
        </p>
        <p>
          His warmth, empathy, and dedication go beyond medicine, advocating for
          preventive care and serving marginalized communities. Dr. Jhonsen is
          not just a doctor but a symbol of integrity, compassion, and
          excellence.
        </p>
      </div>
    </div>
  );
};

export default DoctorPage;
