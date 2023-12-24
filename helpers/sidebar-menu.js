const getMenuItems = (role) => {
  console.log(role);
  const menu = [
    {
      title: "Dashboard",
      icon: "mdi mdi-gauge",
      submenu: [
        { title: "Main", url: "/dashboard" },
        { title: "Progress Bar", url: "/dashboard/progress" },
        { title: "Graphics", url: "/dashboard/graphics" },
      ],
    },
    {
      title: "Maintenance",
      icon: "mdi mdi-folder-lock-open",
      submenu: [
        // { title: "Users", url: "/dashboard/users" },
        { title: "Hospitals", url: "/dashboard/hospitals" },
        { title: "Doctors", url: "/dashboard/doctors" },
      ],
    },
  ];

  if (role === "ADMIN_ROLE") {
    menu[1].submenu.unshift({ title: "Users", url: "/dashboard/users" });
  }

  return menu;
};

export { getMenuItems };
