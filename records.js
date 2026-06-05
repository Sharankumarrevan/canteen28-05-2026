let allRecords = [];

async function loadRecords() {

    try {

        const response =
        await fetch(
            "http://localhost:5000/api/canteen/all"
        );

        const data =
        await response.json();

        allRecords = data;

        renderTable(data);

    }
    catch(err){

        console.error(err);

    }

}

function renderTable(data){

    const table =
    document.getElementById(
        "recordsTable"
    );

    table.innerHTML = "";

    data.forEach(record => {

        table.innerHTML += `
        <tr class="border-b hover:bg-gray-50">

            <td class="p-4">
                ${record.organization?.organizationName || "-"}
            </td>

            <td class="p-4">
                ${record.subsidiary?.subsidiaryName || "-"}
            </td>

            <td class="p-4">
                ${record.location?.locationName || "-"}
            </td>

            <td class="p-4">
                ${record.mealDetails?.mealTitle || "-"}
            </td>

            <td class="p-4 text-center">

                <button
                    onclick="viewRecord('${record._id}')"
                    class="text-green-600 mr-3">

                    👁

                </button>

                <button
                    onclick="editRecord('${record._id}')"
                    class="text-blue-600 mr-3">

                    ✏️

                </button>

                <button
                    onclick="deleteRecord('${record._id}')"
                    class="text-red-600">

                    🗑

                </button>

            </td>

        </tr>
        `;

    });

}

function editRecord(id){

    window.location.href =
    `index.html?id=${id}`;

}

async function deleteRecord(id){

    const ok =
    confirm(
        "Delete this record?"
    );

    if(!ok) return;

    await fetch(
        `http://localhost:5000/api/canteen/${id}`,
        {
            method:"DELETE"
        }
    );

    loadRecords();

}

async function viewRecord(id){

    const response =
    await fetch(
        `http://localhost:5000/api/canteen/${id}`
    );

    const record =
    await response.json();

    document.getElementById(
        "modalContent"
    ).innerHTML = `

    <div class="space-y-4">

        <div>
            <h3 class="font-semibold">
                Organization
            </h3>

            <p>
                ${record.organization?.organizationName || "-"}
            </p>
        </div>

        <div>
            <h3 class="font-semibold">
                Subsidiary
            </h3>

            <p>
                ${record.subsidiary?.subsidiaryName || "-"}
            </p>
        </div>

        <div>
            <h3 class="font-semibold">
                Location
            </h3>

            <p>
                ${record.location?.locationName || "-"}
            </p>
        </div>

        <div>
            <h3 class="font-semibold">
                Meal
            </h3>

            <p>
                ${record.mealDetails?.mealTitle || "-"}
            </p>
        </div>

    </div>
    `;

    document
    .getElementById(
        "viewModal"
    )
    .classList.remove(
        "hidden"
    );

}

document
.getElementById(
    "closeModal"
)
.addEventListener(
    "click",
    () => {

        document
        .getElementById(
            "viewModal"
        )
        .classList.add(
            "hidden"
        );

    }
);

document
document
.getElementById("searchInput")
.addEventListener(
    "input",
    function(){

        const value =
        this.value.toLowerCase();

        const field =
        document.getElementById(
            "searchField"
        ).value;

        const filtered =
        allRecords.filter(record => {

            if(field === "organization"){

                return (
                    record.organization?.organizationName || ""
                )
                .toLowerCase()
                .includes(value);

            }

            if(field === "subsidiary"){

                return (
                    record.subsidiary?.subsidiaryName || ""
                )
                .toLowerCase()
                .includes(value);

            }

            if(field === "location"){

                return (
                    record.location?.locationName || ""
                )
                .toLowerCase()
                .includes(value);

            }

            if(field === "meal"){

                return (
                    record.mealDetails?.mealTitle || ""
                )
                .toLowerCase()
                .includes(value);

            }

            return true;

        });

        renderTable(
            filtered
        );

    }
);

loadRecords();