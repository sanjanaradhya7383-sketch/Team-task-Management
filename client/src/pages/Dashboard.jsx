import { useEffect, useState } from "react";
import axios from "axios";

function Dashboard() {

  const user = JSON.parse(localStorage.getItem("user"));

  const [tasks, setTasks] = useState([]);

const [projects, setProjects] = useState([]);

const [members, setMembers] = useState([]);

const [assignedTo, setAssignedTo] = useState("");

const [search, setSearch] = useState("");

const [filterStatus, setFilterStatus] = useState("all");

const [selectedProject, setSelectedProject] = useState("");

const [title, setTitle] = useState("");

const [description, setDescription] = useState("");

const [dueDate, setDueDate] = useState("");

  const fetchTasks = async () => {

    try {

      const token = localStorage.getItem("token");

      const response = await axios.get(
        "https://team-task-management-production-0d50.up.railway.app/api/tasks",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setTasks(response.data);

    } catch (error) {

      console.log(error);

    }
  };
const fetchProjects = async () => {

  try {

    const token = localStorage.getItem("token");

    const response = await axios.get(
      "https://team-task-management-production-0d50.up.railway.app/api/projects",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    setProjects(response.data);

console.log(response.data);

  } catch (error) {

    console.log(error);

  }
};

const fetchMembers = async () => {

  try {

    const response = await axios.get(
      "https://team-task-management-production-0d50.up.railway.app/api/auth/members"
    );

    setMembers(response.data);

  } catch (error) {

    console.log(error);

  }
};

const createTask = async (e) => {

  e.preventDefault();

  try {

    const token = localStorage.getItem("token");

    await axios.post(
      "https://team-task-management-production-0d50.up.railway.app/api/tasks",
      {
        title,
        description,
        dueDate,
        project: selectedProject,
        assignedTo,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    alert("Task created successfully");

    setTitle("");
    setDescription("");
    setDueDate("");

    fetchTasks();

  } catch (error) {

    console.log(error.response.data);

    alert("Task creation failed");

  }
};

const deleteTask = async (id) => {

  try {

    const token = localStorage.getItem("token");

    await axios.delete(
      `https://team-task-management-production-0d50.up.railway.app/api/tasks/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    fetchTasks();

  } catch (error) {

    console.log(error);

    alert("Delete failed");

  }
};

const updateStatus = async (id, status) => {

  try {

    const token = localStorage.getItem("token");

    await axios.put(
      `https://team-task-management-production-0d50.up.railway.app/api/tasks/${id}`,
      { status },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    fetchTasks();

  } catch (error) {

    console.log(error);

  }
};

useEffect(() => {

  fetchTasks();

  fetchProjects();

  fetchMembers();

}, []);
  const handleLogout = () => {

    localStorage.removeItem("token");

    localStorage.removeItem("user");

    window.location.reload();

  };

  return (
    <div className="min-h-screen bg-slate-100 py-8 px-4">

  <div className="max-w-6xl mx-auto">

      <div className="bg-white p-6 rounded-2xl shadow-md border border-slate-200 flex justify-between items-center mb-8">

        <div>

          <h1 className="text-3xl font-bold">
            Welcome, {user?.name}
          </h1>

          <p className="text-gray-600 mt-2">
            Role: {user?.role}
          </p>

        </div>

        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-5 py-2 rounded-lg hover:bg-red-600 transition"
        >
          Logout
        </button>

      </div>
{
  user?.role === "admin" && (

    <form
      onSubmit={createTask}
     className="bg-white p-6 rounded-2xl shadow-md border border-slate-200 mb-8 space-y-4"
    >

      <h2 className="text-2xl font-bold">
        Create Task
      </h2>

      <input
        type="text"
        placeholder="Task title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full border p-3 rounded-lg"
      />

      <textarea
        placeholder="Task description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="w-full border p-3 rounded-lg"
      />

<select
  value={selectedProject}
  onChange={(e) => setSelectedProject(e.target.value)}
  className="w-full h-12 border rounded-lg px-3 bg-white"
>

  <option value="">Select Project</option>
  {
  projects
    .filter((project) => project.name)
    .map((project) => (
  

    <option
      key={project._id}
      value={project._id}
    >
      {project.name}
    </option>
  ))}

</select>
       
<select
  value={assignedTo}
  onChange={(e) => setAssignedTo(e.target.value)}
  className="w-full h-12 border rounded-lg px-3 bg-white"
>

  <option value="">Assign Member</option>

  {members.map((member) => (
    <option
      key={member._id}
      value={member._id}
    >
      {member.name}
    </option>
  ))}

</select>
      <input
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
        className="w-full border rounded-lg h-11 px-3 bg-white"     
      />

      <button
        type="submit"
        className="bg-black text-white px-6 py-3 rounded-lg"
      >
        Create Task
      </button>

    </form>

  )
}
<div className="max-w-2xl mx-auto mb-8">

<select
  value={filterStatus}
  onChange={(e) =>
    setFilterStatus(e.target.value)
  }
  className="w-full border p-3 rounded-lg mb-6 bg-white"
>

  <option value="all">
    All Tasks
  </option>

  <option value="pending">
    Pending
  </option>

  <option value="in-progress">
    In Progress
  </option>

  <option value="completed">
    Completed
  </option>

</select>
</div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

        {
          tasks
  .filter((task) =>
    task.title
      .toLowerCase()
      .includes(search.toLowerCase())
  )
  .filter((task) =>
    filterStatus === "all"
      ? true
      : task.status === filterStatus
  )
  .map((task) => (

            <div
              key={task._id}
              className="bg-white p-5 rounded-xl shadow"
            >

              <h2 className="text-xl font-bold">
                {task.title}
              </h2>

              <p className="text-gray-600 mt-2">
                {task.description}
              </p>
               
              <p className="mt-3 text-sm text-blue-600 font-medium">
  Project: {task.project?.name || "No Project"}
</p>
<p className="mt-2 text-sm text-green-600 font-medium">
  Assigned To: {task.assignedTo?.name || "Unassigned"}
</p>
              <div className="mt-4">

  <p className="font-medium mb-2">
    Status: {task.status}
  </p>
{
  new Date(task.dueDate) < new Date() &&
  task.status !== "completed" && (

    <p className="text-red-500 font-bold mb-2">
      Overdue Task
    </p>

  )
}
  <select
    value={task.status}
    onChange={(e) =>
      updateStatus(task._id, e.target.value)
    }
    className="border p-2 rounded-lg w-full"
  >
    <option value="pending">
      Pending
    </option>

    <option value="in-progress">
      In Progress
    </option>

    <option value="completed">
      Completed
    </option>

  </select>

</div>

              {
  user?.role === "admin" && (

    <button
      onClick={() => deleteTask(task._id)}
      className="mt-4 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
    >
      Delete
    </button>

  )
}

            </div>

          ))
        }

           </div>

    </div>

  </div>
  );
}

export default Dashboard;