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
                    <p class="fw-bold fs-3">Send an E-mail </p>
                </nav>
                <!-- End of Topbar -->

                <!-- Begin Page Content -->
                <div class="email-right-box m-5">
                    <div class="toolbar" role="toolbar">
                        <div class="btn-group m-b-20">
                            <button type="button" class="btn btn-light"><i class="fa fa-archive"></i>
                            </button>
                            <button type="button" class="btn btn-light"><i class="fa fa-exclamation-circle"></i>
                            </button>
                            <button type="button" class="btn btn-light"><i class="fa fa-trash"></i>
                            </button>
                        </div>
                        <div class="btn-group m-b-20">
                            <button type="button" class="btn btn-light dropdown-toggle" data-toggle="dropdown"><i
                                    class="fa fa-folder"></i> <b class="caret m-l-5"></b>
                            </button>
                            <div class="dropdown-menu"><span class="dropdown-header">Move to</span> <a
                                    class="dropdown-item" href="javascript: void(0);">Social</a> <a
                                    class="dropdown-item" href="javascript: void(0);">Promotions</a> <a
                                    class="dropdown-item" href="javascript: void(0);">Updates</a>
                                <a class="dropdown-item" href="javascript: void(0);">Forums</a>
                            </div>
                        </div>
                        <div class="btn-group m-b-20">
                            <button type="button" class="btn btn-light dropdown-toggle" data-toggle="dropdown"><i
                                    class="fa fa-tag"></i> <b class="caret m-l-5"></b>
                            </button>
                            <div class="dropdown-menu"><span class="dropdown-header">Label as:</span> <a
                                    class="dropdown-item" href="javascript: void(0);">Updates</a> <a
                                    class="dropdown-item" href="javascript: void(0);">Social</a> <a
                                    class="dropdown-item" href="javascript: void(0);">Promotions</a>
                                <a class="dropdown-item" href="javascript: void(0);">Forums</a>
                            </div>
                        </div>
                        <div class="btn-group m-b-20">
                            <button type="button" class="btn btn-light dropdown-toggle" data-toggle="dropdown">More
                                <span class="caret m-l-5"></span>
                            </button>
                            <div class="dropdown-menu"><span class="dropdown-header">More Option :</span> <a
                                    class="dropdown-item" href="javascript: void(0);">Mark as Unread</a> <a
                                    class="dropdown-item" href="javascript: void(0);">Add to Tasks</a> <a
                                    class="dropdown-item" href="javascript: void(0);">Add Star</a> <a
                                    class="dropdown-item" href="javascript: void(0);">Mute</a>
                            </div>
                        </div>
                    </div>
                    <div class="compose-content mt-5">
                        <form action="#">
                            <div class="form-group">
                                <input  v-model="customEmail" type="email" id="customEmail" class="form-control bg-transparent" placeholder=" To">
                            </div>
                            <div class="form-group">
                                <input type="text" class="form-control bg-transparent"  v-model="emailSubject"  id="subject" placeholder=" Subject">
                            </div>
                            <div class="form-group">
                                <textarea v-model="emailMessage" id="message" class="textarea_editor form-control bg-light" rows="15"
                                    placeholder="Enter text ..."></textarea>
                            </div>
                        </form>
                        <h5 class="m-b-20"><i class="fa fa-paperclip m-r-5 f-s-18"></i> Attatchment</h5>
                        <form action="#" class="dropzone">
                            <div class="form-group">
                                <div class="fallback">
                                    <input class="l-border-1" name="file" type="file" multiple="multiple">
                                </div>
                            </div>
                        </form>
                    </div>
                    <div class="text-left m-t-15">
                        <button @click="sendMail" class="btn btn-primary m-b-30 m-t-15 f-s-14 p-l-20 p-r-20 m-r-10" type="button"><i
                                class="fa fa-paper-plane m-r-5"></i> Send</button>
                        <button class="btn btn-dark m-b-30 m-t-15 f-s-14 p-l-20 p-r-20 ml-2" type="button"><i
                                class="ti-close m-r-5 f-s-12"></i> Discard</button>
                    </div>
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