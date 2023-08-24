function updateNote() {
  const { staffName, serviceName, date, time, total } = noteData;
  const createNote = `
    <li>
      <span>Staff:</span>
      ${staffName}
    </li>
    <li>
      <span>Service:</span>
      ${serviceName}
    </li>
    <li>
      <span>Date:</span>
      ${date}/${time}
    </li>
    <li>
      <span>total:</span>
      <span class="total"> ${total}</span>
    </li>`;
  note.innerHTML = createNote;
}
function getStaff() {
  let staffItem = staff
    .map((item) => {
      const { name, email, image, id } = item;
      return `<li class="staff-list-item" onclick="addActiveStaff(event,${id})">
            <div class="img"><img src=${image} alt="staff-img"></div>
            <div class="staff-info">
                <div class="name">${name}</div>
                <div class="email">${email}</div>
            </div>
        </li>`;
    })
    .join("");
  staffList.innerHTML += staffItem;
}
function getService() {
  let serviceItem = services
    .map((item) => {
      const { name, duration, image, price, id } = item;
      return `<li class="service-list-item" onclick="addActiveService(event,${id})">
            <div class="img"><img src=${image} alt="service-img"></div>
            <div class="service-info">
              <div>
                <div class="name">${name}</div>
                <span class="duration">${duration}</span>
              </div>
              <div class="price">$${price}</div>
            </div>
        </li>`;
    })
    .join("");
  serviceList.innerHTML += serviceItem;
}
function getTime() {
  let timeItem = time
    .map((item) => {
      const { start_time, end_time } = item;
      return `<li onclick="addActiveTime(event)" class="time-list-item">
      <span>${start_time}</span>
      <span>${end_time}</span>
  </li>`;
    })
    .join("");
  timeList.innerHTML += timeItem;
}
function getDate() {
    let date = new Date(),
    currentYear = date.getFullYear(),
    currentMonth = date.getMonth();

    const renderCalendar = () => {
    let firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
    let lastDateOfMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    let lastDateOfLastMonth = new Date(currentYear, currentMonth, 0).getDate();
    let lastDayOfMonth = new Date(
      currentYear,
      currentMonth,
      lastDateOfMonth
    ).getDay();
    let liTag = "";
    for (let i = firstDayOfMonth; i > 0; i--) {
      liTag += `<li class="inactive">${lastDateOfLastMonth - i + 1}</li>`;
    }
    for (let i = 1; i <= lastDateOfMonth; i++) {
      const isActiveDate = dateData.includes(`${i}`);
      const liClass = isActiveDate ? "date-list-item select" : "date-list-item";
      if (isActiveDate) {
        liTag += `<li class="${liClass}" onclick="addActiveDate(event)">${i}</li>`;
      } else {
        liTag += `<li class="${liClass}">${i}</li>`;
      }
    }
    for (let i = lastDayOfMonth; i < 6; i++) {
      liTag += `<li class="inactive">${i - lastDateOfLastMonth + 1}</li>`;
    }
    days.innerHTML = liTag;

    currentDate.innerHTML = `${months[currentMonth]} ${currentYear}`;
  };
  renderCalendar();
  prevNext.forEach((item) => {
    item.addEventListener("click", function () {
      currentMonth = item.id === "prev" ? currentMonth - 1 : currentMonth + 1;
      if (currentMonth < 0 || currentMonth > 11) {
        date = new Date(currentYear, currentMonth);
        currentYear = date.getFullYear();
        currentMonth = date.getMonth();
      } else {
        date = new Date();
      }
      renderCalendar();
    });
  });
}

function addActiveStaff(event, id) {
  const clickedItem = event.currentTarget;
  const allItems = document.querySelectorAll(".staff-list-item");
  allItems.forEach((item) => {
    item.classList.remove("active");
  });
  clickedItem.classList.add("active");
  getNextPage();
  let staffName = clickedItem.querySelector(".name").textContent;
  noteData = { ...noteData, staffName };
  updateNote();
  sendData = {
    ...sendData,
    staff_id: id,
  };
}
function addActiveService(event, id) {
  const clickedItem = event.currentTarget;
  const allItems = document.querySelectorAll(".service-list-item");
  allItems.forEach((item) => {
    item.classList.remove("active");
  });
  clickedItem.classList.add("active");
  getNextPage();
  let serviceName = clickedItem.querySelector(".name").textContent;
  let total = clickedItem.querySelector(".price").textContent;
  noteData = { ...noteData, serviceName, total };
  updateNote();
  sendData = {
    ...sendData,
    service_id: id,
  };
}
function addActiveDate(event) {
  const clickedItem = event.currentTarget;
  const allItems = document.querySelectorAll(".date-list-item");
  allItems.forEach((item) => {
    item.classList.remove("active");
  });
  clickedItem.classList.add("active");
  timeList.style.display = "flex";
  let monthName = currentDate.innerHTML.split(" ")[0];
  let year = currentDate.innerHTML.split(" ")[1];
  const externalData = {
    day:
      clickedItem.innerHTML < 10
        ? 0 + clickedItem.innerHTML
        : clickedItem.innerHTML,
    month:
      months.indexOf(monthName) + 1 < 10
        ? "0" + (months.indexOf(monthName) + 1)
        : months.indexOf(monthName) + 1,
    year,
  };

  function updateSelectedDate() {
    const selectedDay = externalData.day;
    const selectedMonth = externalData.month;
    const selectedYear = externalData.year;
    const formattedDate = `${selectedDay}-${selectedMonth}-${selectedYear}`;

    selectedDate.innerHTML = formattedDate;
  }
  updateSelectedDate();
  let date = selectedDate.textContent;
  noteData = { ...noteData, date };
  sendData = {
    ...sendData,
    date,
  };
  updateNote();
}
function addActiveTime(event) {
  const clickedItem = event.currentTarget;
  const allItems = document.querySelectorAll(".time-list-item");
  allItems.forEach((item) => {
    item.classList.remove("active");
  });
  clickedItem.classList.add("active");
  getNextPage();
  let time = clickedItem.textContent.trim().replace(/\s+/g, "-");
  noteData = { ...noteData, time };
  sendData = {
    ...sendData,
    time,
  };
  updateNote();
}
function getPrevPage() {
  let allTabPanelLength = allTabPanel.length;
  tabIndex === 0 ? 0 : tabIndex--;
  allTabPanel.forEach((item, index) => {
    if (index === tabIndex) {
      item.style.display = "block";
    } else {
      item.style.display = "none";
    }
  });
  tabIndex > 0
    ? (prevBtn.style.display = "block")
    : (prevBtn.style.display = "none");

  tabIndex === allTabPanelLength - 1
    ? (nextBtn.innerText = "Confirm booking")
    : (nextBtn.innerText = "Next");
  tabListItem.forEach((item, index) => {
    if (index === tabIndex) {
      item.classList.remove("completed");
      item.classList.add("active");
    } else {
      item.classList.remove("active");
    }
  });
}
function getNextPage() {
  let allTabPanelLength = allTabPanel.length;
  const activeStaff = document.querySelector(".staff-list .active");
  const activeService = document.querySelector(".service-list .active");
  const activeDate = document.querySelector(".days .active");
  const activeTime = document.querySelector(".time-list .active");
  if (!activeStaff && tabIndex === 0) {
    errorModal.classList.add("active");
    errorText.innerText = "Select staff";
    setTimeout(() => {
      errorModal.classList.remove("active");
    }, 1000);
    return;
  } else {
    errorModal.classList.remove("active");
  }
  if (!activeService && tabIndex === 1) {
    errorModal.classList.add("active");
    errorText.innerText = "Select service";
    setTimeout(() => {
      errorModal.classList.remove("active");
    }, 1000);
    return;
  }
  if ((!activeDate || !activeTime) && tabIndex === 2) {
    errorModal.classList.add("active");
    errorText.innerText = "Select Date & time";
    setTimeout(() => {
      errorModal.classList.remove("active");
    }, 1000);
    return;
  }

  if (tabIndex === 3) {
    if (
      firstNameInput.value === "" ||
      lastNameInput.value === "" ||
      emailInput.value === ""
    ) {
      confirmModal.classList.add("active");
      modalOverlay.classList.add("active");
      message.innerText = "Please, fill the all required fields!";
      message.classList.add("error");
      return;
    } else {
      sendData = {
        ...sendData,
        customer: {
          name: firstNameInput.value,
          surname: lastNameInput.value,
          email: emailInput.value,
          phone: phoneInput.value,
        },
      };
      console.log(sendData);
      firstNameInput.value = "";
      lastNameInput.value = "";
      emailInput.value = "";
      phoneInput.value = "";
      confirmModal.classList.add("active");
      modalOverlay.classList.add("active");
      message.innerText = "Confirmation successfully completed!";
      message.classList.remove("error");
      message.classList.add("success");
    }
  }

  tabIndex === allTabPanelLength - 1 ? tabIndex : tabIndex++;
  allTabPanel.forEach((item, index) => {
    if (index === tabIndex) {
      item.style.display = "block";
    } else {
      item.style.display = "none";
    }
  });
  tabListItem.forEach((item, index) => {
    if (index === tabIndex) {
      item.classList.add("active");
    } else {
      index < tabIndex ? item.classList.add("completed") : "";
      item.classList.remove("active");
    }
  });
  tabIndex > 0
    ? (prevBtn.style.display = "block")
    : (prevBtn.style.display = "none");

  tabIndex === allTabPanelLength - 1
    ? (nextBtn.innerText = "Confirm booking")
    : (nextBtn.innerText = "Next");
}
function hideConfirmModal() {
  confirmModal.classList.remove("active");
  modalOverlay.classList.remove("active");
}
let tabIndex = 0;
if (tabIndex === 0) {
  prevBtn.style.display = "none";
}
nextBtn.addEventListener("click", getNextPage);
prevBtn.addEventListener("click", getPrevPage);
form.addEventListener("submit", (e) => e.preventDefault());
getService();
getStaff();
getDate();
getTime();
