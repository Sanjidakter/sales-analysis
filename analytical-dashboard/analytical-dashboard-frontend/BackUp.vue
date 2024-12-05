<template>

  <div id="wrapper">
      <!-- Sidebar -->
      <ul class="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">
          <!-- Sidebar - Brand -->
          <a class="sidebar-brand d-flex align-items-center justify-content-center" href="/">
              <div class="sidebar-brand-icon rotate-n-15">
                  <i class="fas fa-chart-area"></i>
              </div>
              <div class="sidebar-brand-text mx-3">Admin</div>
          </a>

          <!-- Divider -->
          <hr class="sidebar-divider my-0" />

          <!-- Nav Item - Dashboard -->
          <li class="nav-item active">
              <a class="nav-link" href="/">
                  <i class="fas fa-fw fa-tachometer-alt"></i>
                  <span>Dashboard</span></a>
          </li>

          <!-- Divider -->
          <hr class="sidebar-divider" />

          <!-- Heading -->
          <div class="sidebar-heading">Addons</div>

          <!-- Nav Item - Charts -->
          <li class="nav-item">
              <a class="nav-link" href="/piechart">
                  <i class="fas fa-fw fa-chart-area"></i>
                  <span>Charts</span></a>
          </li>

          <!-- Nav Item - Tables -->
          <li class="nav-item">
              <a class="nav-link" href="https://chic-pasca-8e5b8b.netlify.app/">
                  <i class="fas fa-fw fa-table"></i>
                  <span>Bar-Chart</span></a>
          </li>

          <!-- Nav Item - Tables -->
          <li class="nav-item">
              <a class="nav-link" href="/mail">
                  <i class="fas fa-envelope"></i>
                  <span>Send Mail</span></a>
          </li>

          <!-- Divider -->
          <hr class="sidebar-divider d-none d-md-block" />

          <!-- Sidebar Toggler (Sidebar) -->
          <div class="text-center d-none d-md-inline">
              <button class="rounded-circle border-0" id="sidebarToggle"></button>
          </div>

          <!-- Sidebar Message -->
          <div class="sidebar-card d-none d-lg-flex">
              <img class="sidebar-card-illustration mb-2" src="../../assets/img/undraw_rocket.svg" alt="..." />
              <p class="text-center mb-2">
                  <strong>Admin Dashboard</strong> for visualizing data more
                  effeciently!
              </p>
              <a class="btn btn-success btn-sm" href="https://startbootstrap.com/theme/sb-admin-pro">Enjoy!</a>
          </div>
      </ul>
      <!-- End of Sidebar -->

      <!-- Content Wrapper -->
      <div id="content-wrapper" class="d-flex flex-column">
          <!-- Main Content -->
          <div id="content">
              <!-- Topbar -->
              <nav class="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">
                  <!-- Sidebar Toggle (Topbar) -->
                  <button id="sidebarToggleTop" class="btn btn-link d-md-none rounded-circle mr-3">
                      <i class="fa fa-bars"></i>
                  </button>
<p class="fw-bold fs-3">Reneta Sales Report </p>
              </nav>
              <!-- End of Topbar -->

              <!-- Begin Page Content -->
              <div>
                  <h1>Send Email</h1>
                  <div>
                      <label for="customEmail">Enter Email Address:</label>
                      <input v-model="customEmail" type="email" id="customEmail" placeholder="Enter email address" />
                  </div>
                  <div>
                      <label for="subject">Subject:</label>
                      <input v-model="emailSubject" type="text" id="subject" />
                  </div>
                  <div>
                      <label for="message">Message:</label>
                      <textarea v-model="emailMessage" id="message"></textarea>
                  </div>
                  <button @click="sendMail">Send Email</button>
              </div>
              <!-- /.container-fluid -->
          </div>
          <!-- End of Main Content -->

          <!-- Footer -->
          <footer class="sticky-footer bg-white">
              <div class="container my-auto">
                  <div class="copyright text-center my-auto">
                      <span>Copyright &copy; Reneta Sales 2024</span>
                  </div>
              </div>
          </footer>
          <!-- End of Footer -->
      </div>
      <!-- End of Content Wrapper -->
  </div>


</template>

<script>
import axios from "axios";

export default {
  data() {
      return {
          users: [],
          selectedUser: null,
          customEmail: "",
          emailSubject: "",
          emailMessage: "",
      };
  },
  async mounted() {
      try {
          const response = await axios.get("http://localhost:3000/api/users");
          this.users = response.data;
      } catch (error) {
          console.error("Error fetching users:", error.message);
      }
  },
  methods: {
      async sendMail() {
          // Determine recipient email
          const recipientEmail = this.customEmail || (this.selectedUser && this.selectedUser.email);

          if (!recipientEmail || !this.emailSubject || !this.emailMessage) {
              alert("Please fill in all fields.");
              return;
          }

          const emailData = {
              to: recipientEmail,
              subject: this.emailSubject,
              message: this.emailMessage,
          };

          try {
              await axios.post("https://analytical-dashboard-backend-rosy.vercel.app/api/send-mail", emailData);
              alert("Email sent successfully!");
          } catch (error) {
              console.error("Error sending email:", error.message);
              alert("Failed to send email. Please try again later.");
          }
      },
  },
};
</script>