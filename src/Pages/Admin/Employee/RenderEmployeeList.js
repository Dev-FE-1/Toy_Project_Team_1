// import styles from "./Employee.module.css";

// const renderEmployeeList = (data) => {
//   const container = document.querySelector(`.${styles.employeeList}`);
//   console.log(data);
//   // Clear existing content
//   container.innerHTML = "";

//   // Create a table element
//   const table = document.createElement("table");
//   table.className = styles.employeeListTable;

//   // Create table header (optional)
//   const thead = document.createElement("thead");
//   thead.innerHTML = `
//     <tr>
//       <th>사진</th>
//       <th>정보</th>
//     </tr>
//   `;
//   table.appendChild(thead);

//   // Create table body
//   const tbody = document.createElement("tbody");
//   tbody.className = styles.employeeListTbody;

//   // Append table body to table
//   table.appendChild(tbody);

//   // Render each item in the data array
//   data.forEach((item) => {
//     const tr = document.createElement("tr");
//     tr.className = styles.employeeListRow;
//     tr.innerHTML = `
//       <td class="${styles.employeeListImg}">
//         <img src="${item.img}" alt="${item.name}" />
//       </td>
//       <td class="${styles.employeeListInfo}">
//         <h3>${item.name} - ${item.position}</h3>
//         <p>이메일: ${item.email}</p>
//         <p>생일: ${item.birthday}</p>
//         <p>입사일: ${item.joinday}</p>
//         <p>연락처: ${item.phone}</p>
//         <p>관리:
//           <button class="${styles.editButton}" data-employee-id="${item.id}">수정</button>
//         </p>
//       </td>
//     `;

//     // Add click event listener to the edit button
//     const editButton = tr.querySelector(`.${styles.editButton}`);
//     editButton.addEventListener("click", (e) => {
//       e.preventDefault();
//       const employeeId = e.target.getAttribute("data-employee-id");
//       window.location.href = `/employee/editpage/${employeeId}`;
//     });

//     tbody.appendChild(tr);
//   });

//   // Append table to container
//   container.appendChild(table);
// };

// export default renderEmployeeList;
