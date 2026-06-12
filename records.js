let allRecords = [];

let currentPage = 1;

const rowsPerPage = 5;


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

    const start =
    (currentPage - 1) *
    rowsPerPage;

    const end =
    start + rowsPerPage;

    const paginatedData =
    data.slice(start, end);

    paginatedData.forEach(record => {

        table.innerHTML += `

<tr class="border-b hover:bg-slate-50">

<td class="py-3 px-4">
${record.organization?.organizationName || "-"}
</td>

<td class="py-3 px-4">
${record.subsidiary?.subsidiaryName || "-"}
</td>

<td class="py-3 px-4">
${record.location?.locationName || "-"}
</td>

<td class="py-3 px-4">
-
</td>

<td class="py-3 px-4">

<div class="flex gap-2">

<button
onclick="viewRecord('${record._id}')">

👁

</button>

<button
onclick="editRecord('${record._id}')">

✏️

</button>

<button
onclick="deleteRecord('${record._id}')">

🗑

</button>

</div>

</td>

</tr>

`;

    });

    updatePagination(data);

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

    try{

        const canteenResponse =
        await fetch(
            `http://localhost:5000/api/canteen/${id}`
        );

        const canteen =
        await canteenResponse.json();

        const mealResponse =
        await fetch(
            `http://localhost:5000/api/meal-details/by-canteen/${id}`
        );

        const meal =
        await mealResponse.json();

        document.getElementById(
            "modalContent"
        ).innerHTML = `

        <div class="space-y-3">

            <h3 class="font-bold text-lg">
                Organization Details
            </h3>

            <p>
                <strong>Organization Code:</strong>
                ${canteen.organization?.organizationCode || "-"}
            </p>

            <p>
                <strong>Organization Name:</strong>
                ${canteen.organization?.organizationName || "-"}
            </p>

            <p>
                <strong>Subsidiary:</strong>
                ${canteen.subsidiary?.subsidiaryName || "-"}
            </p>

            <p>
                <strong>Location:</strong>
                ${canteen.location?.locationName || "-"}
            </p>

            <hr>

            <h3 class="font-bold text-lg">
                Meal Details
            </h3>

            <p>
                <strong>Meal Title:</strong>
                ${meal?.mealTitle || "-"}
            </p>

            <p>
                <strong>From Time:</strong>
                ${meal?.fromTime || "-"}
            </p>

            <p>
                <strong>To Time:</strong>
                ${meal?.toTime || "-"}
            </p>

            <p>
                <strong>Rate:</strong>
                ${meal?.rate || "-"}
            </p>

            <p>
                <strong>Subsidy %:</strong>
                ${meal?.subsidyPercentage || "-"}
            </p>

            <p>
                <strong>Meals Served:</strong>
                ${meal?.mealsServed || "-"}
            </p>

        </div>
        `;

        document
        .getElementById("viewModal")
        .classList.remove("hidden");

    }
    catch(err){

        console.error(err);

    }

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

            // if(field === "meal"){

            //     return (
            //         record.mealDetails?.mealTitle || ""
            //     )
            //     .toLowerCase()
            //     .includes(value);

            // }

            return true;

        });

        renderTable(
            filtered
        );

    }
);

function updatePagination(data){

    const totalPages =
    Math.ceil(
        data.length /
        rowsPerPage
    );

    const startEntry =
    ((currentPage - 1) *
    rowsPerPage) + 1;

    const endEntry =
    Math.min(
        currentPage *
        rowsPerPage,
        data.length
    );

    document.getElementById(
        "paginationInfo"
    ).innerText =

        `Showing ${startEntry} to ${endEntry} of ${data.length} entries`;

    const pageNumbers =
    document.getElementById(
        "pageNumbers"
    );

    pageNumbers.innerHTML = "";

    for(
        let i = 1;
        i <= totalPages;
        i++
    ){

        pageNumbers.innerHTML += `

<button
onclick="goToPage(${i})"
class="${
    i === currentPage
    ? 'bg-black text-white'
    : 'bg-white'
}
h-8 w-8 rounded border text-sm">

${i}

</button>

`;

    }

}


loadRecords();