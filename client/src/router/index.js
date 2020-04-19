import Vue from "vue";
import VueRouter from "vue-router";

import AddRoom from "../views/Admin/AddRoom.vue";
import AdminHome from "../views/Admin/AdminHome.vue";
import ManageBooking from "../views/Admin/ManageBooking.vue";
import EditRoom from "../views/Admin/EditRoom.vue";
import AdminViewRooms from "../views/Admin/ViewRooms.vue";

import Login from "../views/Auth/Login.vue";
import Register from "../views/Auth/Register.vue";

import BookRoom from "../views/User/BookRoom.vue";
import Profile from "../views/User/Profile.vue";
import UserHome from "../views/User/UserHome.vue";
import ViewRoomUser from "../views/User/ViewRoom.vue";
import ViewRooms from "../views/User/ViewRooms.vue";

import Template from "../views/Template.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/login",
    name: "login",
    component: Login
  },
  {
    path: "/register",
    name: "register",
    component: Register
  },
  {
    path: "/admin",
    component: AdminHome,
    children: [
      {
        path: "add-room",
        component: AddRoom,
        name: "admin-add-room"
      },
      {
        path: "edit-room",
        component: EditRoom,
        name: "admin-edit-room"
      },
      {
        path: "bookings",
        component: ManageBooking,
        name: "admin-bookings"
      },
      {
        path: "rooms",
        component: AdminViewRooms,
        name: "admin-view-rooms"
      },
      {
        path: "",
        redirect: { name: "admin-view-rooms" }
      }
    ]
  },
  {
    path: "/user",
    component: UserHome,
    children: [
      {
        path: "book-room",
        component: BookRoom,
        name: "user-book-room"
      },
      {
        path: "view-room",
        component: ViewRoomUser,
        name: "user-view-room"
      },
      {
        path: "view-rooms",
        component: ViewRooms,
        name: "user-view-rooms"
      },
      {
        path: "profile",
        component: Profile,
        name: "user-profile"
      },
      {
        path: "",
        redirect: { name: "user-view-rooms" }
      }
    ]
  },
  {
    path: "",
    component: Template,
    name: "default"
  }
];

const router = new VueRouter({
  routes
});

export default router;
