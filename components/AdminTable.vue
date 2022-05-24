<template>
    <div>
        <!-- Pending Requests for CAFOA -->
        <h1 class="text-xl font-bold">Pending Requests for CAFOA</h1>
        <div class="block w-full overflow-x-auto mt-5">
            <vue-good-table
                :search-options="{
                enabled: true,
                trigger: 'enter',
                }"
                mode="remote"
                :totalRows="requestsTotal"
                :pagination-options="{
                enabled: true,
                }"
                :columns="columns"
                :rows="requests"
                :line-numbers="true"
            >
                <template slot="table-row" slot-scope="props">
                <span v-if="props.column.field == 'action'">
                    <!-- {{ props.row }} -->
                    <div class="flex flex-wrap grid grid-cols-2 gap-2">
                    <div class="pr-3">
                        <button
                        type="button"
                        @click="create(roleId == 4 ? props.row.control_number : props.row.id)"
                        class="text-xs bg-blue-700 hover:bg-blue-400 text-white font-bold py-2 px-4 rounded"
                        >Create</button>
                    </div>
                    </div>
                </span>
                </template>
            </vue-good-table>
        </div>
        <!-- Pending CAFOA for Vouchers -->
        <h1 class="text-xl font-bold mt-10">Pending CAFOA for Vouchers</h1>
        <div class="block w-full overflow-x-auto mt-5">
            <vue-good-table
                :search-options="{
                enabled: true,
                trigger: 'enter',
                }"
                mode="remote"
                :totalRows="cafoaTotal"
                :pagination-options="{
                enabled: true,
                }"
                :columns="columns"
                :rows="cafoa"
                :line-numbers="true"
            >
                <template slot="table-row" slot-scope="props">
                <span v-if="props.column.field == 'action'">
                    <!-- {{ props.row }} -->
                    <div class="flex flex-wrap grid grid-cols-2 gap-2">
                    <div class="pr-3">
                        <button
                        type="button"
                        @click="create(roleId == 4 ? props.row.control_number : props.row.id)"
                        class="text-xs bg-blue-700 hover:bg-blue-400 text-white font-bold py-2 px-4 rounded"
                        >Create</button>
                    </div>
                    </div>
                </span>
                </template>
            </vue-good-table>
        </div>
    </div>
</template>
<script>
export default {
    props: {
        requests: {
            type: Array,
            default: null,
        },
        requestsTotal: {
            type: Number,
            default: 0,
        },
        cafoa: {
            type: Array,
            default: null
        },
        cafoaTotal: {
            type: Number,
            default: null,
        },
    },
    data() {
        return {
            columns: [
                {
                label: 'Control No.',
                field: 'control_number',
                },
                {
                label: 'Status',
                field: 'status',
                }
            ],
        };
    },
}
</script>
