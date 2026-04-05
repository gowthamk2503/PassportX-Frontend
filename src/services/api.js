// =========================================
// FRONTEND-ONLY MOCK API (NO BACKEND)
// =========================================


// =============== AUTH SERVICE ===============
export const authService = {

  signup: async (data) => {
    console.log("Mock signup:", data);

    return {
      data: {
        message: "Signup successful (Demo Mode)"
      }
    };
  },

  login: async (data) => {
    console.log("Mock login:", data);

    const user = {
      name: "Demo User",
      email: data.email || "demo@gmail.com"
    };

    // Save to localStorage
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("token", "demo-token");

    return {
      data: {
        token: "demo-token",
        user
      }
    };
  },

  getMe: async () => {
    const user = JSON.parse(localStorage.getItem("user"));

    return {
      data: user || null
    };
  }
};


// =============== APPLICATION SERVICE ===============
export const applicationService = {

  createApplication: async () => {
    const newApp = {
      id: Date.now(),
      status: "In Progress",
      createdAt: new Date().toISOString()
    };

    const apps = JSON.parse(localStorage.getItem("applications")) || [];
    apps.push(newApp);

    localStorage.setItem("applications", JSON.stringify(apps));

    return { data: newApp };
  },

  getApplications: async () => {
    const apps = JSON.parse(localStorage.getItem("applications")) || [];
    return { data: apps };
  },

  getApplication: async (applicationId) => {
    const apps = JSON.parse(localStorage.getItem("applications")) || [];
    const app = apps.find(a => a.id === applicationId);

    return { data: app || null };
  },

  updateStep: async (applicationId, step, data) => {
    console.log("Step update:", { applicationId, step, data });

    return {
      data: { message: "Step updated (Demo)" }
    };
  },

  submitApplication: async (applicationId) => {
    let apps = JSON.parse(localStorage.getItem("applications")) || [];

    apps = apps.map(app =>
      app.id === applicationId
        ? { ...app, status: "Submitted" }
        : app
    );

    localStorage.setItem("applications", JSON.stringify(apps));

    return {
      data: { message: "Application submitted successfully (Demo)" }
    };
  },

  uploadDocument: async (applicationId, file, docType) => {
    console.log("Mock upload:", file, docType);

    return {
      data: { message: "Document uploaded (Demo)" }
    };
  },

  generatePDF: async (applicationId) => {
    console.log("Generate PDF for:", applicationId);

    return {
      data: { message: "PDF generated (Demo)" }
    };
  },

  downloadPDF: async () => {
    alert("📄 Demo PDF Download (No real file)");

    return { data: null };
  },

  updateApplication: async (applicationId, data) => {
    console.log("Update application:", applicationId, data);

    return {
      data: { message: "Application updated (Demo)" }
    };
  }
};


// =============== APPOINTMENT SERVICE ===============
export const appointmentService = {

  getAvailableSlots: async (date) => {
    return {
      data: [
        "10:00 AM",
        "11:30 AM",
        "2:00 PM",
        "4:00 PM"
      ]
    };
  },

  bookAppointment: async (applicationId, data) => {
    console.log("Booking appointment:", applicationId, data);

    return {
      data: { message: "Appointment booked (Demo)" }
    };
  },

  getAppointments: async () => {
    return {
      data: []
    };
  },

  cancelAppointment: async (appointmentId) => {
    return {
      data: { message: "Appointment cancelled (Demo)" }
    };
  }
};


// =========================================
// END OF FILE
// =========================================