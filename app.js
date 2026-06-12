const params =
new URLSearchParams(
    window.location.search
);

const editId =
params.get("id");

(function () {

    const canteenData = {
    organization: {},
    subsidiary: {},
    location: {},
    mealDetails: {}
    // mealTimings: {},
    // subsidy: {},
    // employeeConsumption: {},
    // specialDays: {}
   };

    const topOrg =
        document.getElementById("top-org");

    const topCanteen =
        document.getElementById("top-canteen");

    const orgSidebar =
        document.getElementById("org-sidebar");

    const canteenSidebar =
        document.getElementById("canteen-sidebar");

    const backBtn =
        document.getElementById("nav-back");

    const nextBtn =
        document.getElementById("nav-next");

    const allModules =
        document.querySelectorAll(".module");

    let currentModule = 0;

    function showModule(index) {

        allModules.forEach((module, i) => {

            module.classList.toggle(
                "hidden",
                i !== index
            );

        });

        currentModule = index;

        updateSidebar();
        updateButtons();
        updateTopTabs();
    }

    function updateButtons() {

        backBtn.style.visibility =
            currentModule === 0
                ? "hidden"
                : "visible";

        nextBtn.innerText =
            currentModule === 1
                ? "Save"
                : "Next";

    }

    function updateTopTabs() {

        if (currentModule === 0) {

            topOrg.classList.add(
                "text-blue-600",
                "border-blue-500"
            );

            topOrg.classList.remove(
                "text-gray-900",
                "border-transparent"
            );

            topCanteen.classList.remove(
                "text-blue-600",
                "border-blue-500"
            );

            topCanteen.classList.add(
                "text-gray-900",
                "border-transparent"
            );

        } else {

            topCanteen.classList.add(
                "text-blue-600",
                "border-blue-500"
            );

            topCanteen.classList.remove(
                "text-gray-900",
                "border-transparent"
            );

            topOrg.classList.remove(
                "text-blue-600",
                "border-blue-500"
            );

            topOrg.classList.add(
                "text-gray-900",
                "border-transparent"
            );

        }

    }

    function updateSidebar() {

        document
            .querySelectorAll(
                "#org-sidebar button"
            )
            .forEach(btn => {

                btn.classList.remove(
                    "bg-blue-100",
                    "text-blue-900"
                );

                btn.classList.add(
                    "text-gray-700"
                );

                if (
                    Number(
                        btn.dataset.module
                    ) === currentModule
                ) {

                    btn.classList.add(
                        "bg-blue-100",
                        "text-blue-900"
                    );

                }

            });

        document
            .querySelectorAll(
                "#canteen-sidebar button"
            )
            .forEach(btn => {

                btn.classList.remove(
                    "bg-blue-100",
                    "text-blue-900"
                );

                btn.classList.add(
                    "text-gray-700"
                );

                if (
                    Number(
                        btn.dataset.module
                    ) === currentModule
                ) {

                    btn.classList.add(
                        "bg-blue-100",
                        "text-blue-900"
                    );

                }

            });

    }

    function switchToOrg() {

        orgSidebar.classList.remove(
            "hidden"
        );

        canteenSidebar.classList.add(
            "hidden"
        );

        showModule(0);

    }

    function switchToCanteen() {

        canteenSidebar.classList.remove(
            "hidden"
        );

        orgSidebar.classList.add(
            "hidden"
        );

        showModule(1);

    }

    topOrg.addEventListener(
        "click",
        switchToOrg
    );

    topCanteen.addEventListener(
        "click",
        switchToCanteen
    );

    document
        .querySelectorAll(
            "#org-sidebar button"
        )
        .forEach(btn => {

            btn.addEventListener(
                "click",
                () => {

                    showModule(
                        Number(
                            btn.dataset.module
                        )
                    );

                }
            );

        });

    document
        .querySelectorAll(
            "#canteen-sidebar button"
        )
        .forEach(btn => {

            btn.addEventListener(
                "click",
                () => {

                    showModule(
                        Number(
                            btn.dataset.module
                        )
                    );

                }
            );

        });

  backBtn.addEventListener(
    "click",
    () => {

        if (currentModule > 0) {

            showModule(
                currentModule - 1
            );

            if (
                currentModule === 0
            ) {

                orgSidebar.classList.remove(
                    "hidden"
                );

                canteenSidebar.classList.add(
                    "hidden"
                );

            } else {

                canteenSidebar.classList.remove(
                    "hidden"
                );

                orgSidebar.classList.add(
                    "hidden"
                );

            }

        }

    }
);

nextBtn.addEventListener("click", () => {

    if (currentModule < 1) {

        showModule(currentModule + 1);

        if (currentModule >= 1) {

            canteenSidebar.classList.remove(
                "hidden"
            );

            orgSidebar.classList.add(
                "hidden"
            );

        }

    }
    else {

        console.log(
            "FINAL DATA",
            JSON.stringify(
                canteenData,
                null,
                2
            )
        );

        (async () => {

         try {
     console.log("Before Organization");

const orgResult =
    await saveOrganization();

console.log(
    "Organization Saved:",
    orgResult
);

console.log("Before Meal Details");

const mealResult =
    await saveMealDetails();

console.log(
    "Meal Details Saved:",
    mealResult
);

console.log("After Meal Details");
    localStorage.removeItem(
        "canteenData"
    );

    alert(
        "Record Saved Successfully"
    );

    window.location.href =
        "./records.html";

}
catch(err){

    console.error(
        "Save Error:",
        err
    );

}

        })();

    }

});


    // ===============================
// DYNAMIC FORM DATA COLLECTION
// ===============================

document
    .querySelectorAll("[data-section]")
    .forEach(field => {

        field.addEventListener(
            "input",
            updateFormData
        );

        field.addEventListener(
            "change",
            updateFormData
        );

    });

function updateFormData() {

    const section =
        this.dataset.section;

    const field =
        this.dataset.field;

    let value = this.value;

    if (this.type === "number") {

        value =
            value === ""
                ? 0
                : Number(value);

    }

    canteenData[section][field] =
        value;

    localStorage.setItem(
        "canteenData",
        JSON.stringify(canteenData)
    );

}

// ===============================
// RESTORE SAVED DATA
// ===============================

const savedData =
    localStorage.getItem(
        "canteenData"
    );

if (savedData) {

    Object.assign(
        canteenData,
        JSON.parse(savedData)
    );

    console.log(
        "Restored Data:",
        canteenData
    );

}

/* ===========================
   EDIT RECORD FUNCTIONS
=========================== */

async function loadRecordForEdit(){

    try{

        const response =
        await fetch(
            `http://localhost:5000/api/canteen/${editId}`
        );

        const record =
        await response.json();

        canteenData.organization =
        record.organization || {};

        canteenData.subsidiary =
        record.subsidiary || {};

        canteenData.location =
        record.location || {};

    
        // canteenData.mealTimings =
        // record.mealTimings || {};

        // canteenData.subsidy =
        // record.subsidy || {};

        // canteenData.employeeConsumption =
        // record.employeeConsumption || {};

        // canteenData.specialDays =
        // record.specialDays || {};

        canteenData.location =
record.location || {};

// Fetch Meal Details separately
const mealResponse =
await fetch(
    `http://localhost:5000/api/meal-details/by-canteen/${editId}`
);

const meal =
await mealResponse.json();

console.log(
    "Meal Details Loaded:",
    meal
);

canteenData.mealDetails = {

    mealTitle:
        meal?.mealTitle || "",

    fromTime:
        meal?.fromTime || "",

    toTime:
        meal?.toTime || "",

    rate:
        meal?.rate || "",

    subsidyPercentage:
        meal?.subsidyPercentage || "",

    mealsServed:
        meal?.mealsServed || ""

};

        populateForm();

    }
    catch(err){

        console.error(
            "Edit Load Error:",
            err
        );

    }

}

function populateForm(){

    document
    .querySelectorAll("[data-section]")
    .forEach(field => {

        const section =
        field.dataset.section;

        const key =
        field.dataset.field;

        if(
            canteenData[section] &&
            canteenData[section][key] !==
            undefined
        ){

            field.value =
            canteenData[section][key];

        }

    });

}



// ===============================
// INITIAL LOAD
// ===============================

orgSidebar.classList.remove(
    "hidden"
);

canteenSidebar.classList.add(
    "hidden"
);

if(editId){

    loadRecordForEdit();

}

async function saveOrganization() {

    const payload = {

        organization:
            canteenData.organization,

        subsidiary:
            canteenData.subsidiary,

        location:
            canteenData.location

    };

    const url = editId
        ? `http://localhost:5000/api/canteen/${editId}`
        : "http://localhost:5000/api/canteen/save";

    const method = editId
        ? "PUT"
        : "POST";

    const response = await fetch(url, {
        method,
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
    });

    if (!response.ok) {

        throw new Error(
            "Organization Save Failed"
        );

    }

    const data =
        await response.json();

    localStorage.setItem(
        "canteenId",
        data._id
    );

    return data;

}

async function saveMealDetails() {

    const payload = {

        canteenId:
        localStorage.getItem(
            "canteenId"
        ),

        ...canteenData.mealDetails

    };

    console.log(
        "MEAL DETAILS PAYLOAD",
        payload
    );

    const response =
    await fetch(
        "http://localhost:5000/api/meal-details/save",
        {
            method: "POST",
            headers: {
                "Content-Type":
                "application/json"
            },
            body:
            JSON.stringify(payload)
        }
    );

    const result =
    await response.json();

    console.log(
        "MEAL DETAILS RESPONSE",
        result
    );

    return result;

}

// async function saveEmployeeConsumption() {

//     const payload = {

//         canteenId:
//             localStorage.getItem("canteenId"),

//         ...canteenData.employeeConsumption

//     };

//     const response =
//         await fetch(
//             "http://localhost:5000/api/employee-consumption/save",
//             {
//                 method: "POST",
//                 headers: {
//                     "Content-Type":
//                         "application/json"
//                 },
//                 body:
//                     JSON.stringify(payload)
//             }
//         );

//     return await response.json();
// }


// async function saveSpecialDays() {

//     const payload = {

//         canteenId:
//             localStorage.getItem("canteenId"),

//         ...canteenData.specialDays

//     };

//     const response =
//         await fetch(
//             "http://localhost:5000/api/special-days/save",
//             {
//                 method: "POST",
//                 headers: {
//                     "Content-Type":
//                         "application/json"
//                 },
//                 body:
//                     JSON.stringify(payload)
//             }
//         );

//     return await response.json();
// }

// async function saveOrganization() {

//     const payload = {

//         organization:
//             canteenData.organization,

//         subsidiary:
//             canteenData.subsidiary,

//         location:
//             canteenData.location

//     };

//     const response =
//         await fetch(
//             "http://localhost:5000/api/canteen/save",
//             {
//                 method: "POST",
//                 headers: {
//                     "Content-Type":
//                         "application/json"
//                 },
//                 body:
//                     JSON.stringify(payload)
//             }
//         );

//     const data =
//         await response.json();

//     localStorage.setItem(
//         "canteenId",
//         data._id
//     );

//     return data;

// }

// async function saveMealTiming() {

//     const payload = {

//         canteenId:
//             localStorage.getItem(
//                 "canteenId"
//             ),

//         ...canteenData.mealTimings

//     };

//     const response =
//         await fetch(
//             "http://localhost:5000/api/meal-timing/save",
//             {
//                 method: "POST",
//                 headers: {
//                     "Content-Type":
//                         "application/json"
//                 },
//                 body:
//                     JSON.stringify(payload)
//             }
//         );

//     return await response.json();

// }


showModule(0);

})();

