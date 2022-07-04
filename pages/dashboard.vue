<template>
  <div>
    <div class="bg-slate-200">
      <AdminNavbar :notification_rows="notification_rows" title="Dashboard" />

      <DashStatus
        :roleId="roleId"
        :completed="completed"
        :pending="pending"
        :completedCafoa="completedCafoa"
        :completedVoucher="completedVoucher"
        :pendingRequest="pendingRequests"
        :pendingCafoa="pendingCafoa"
        :pendingVouchers="pendingVouchers"
        :pendingItem="pendingItem"
        :completedItem="completedItem"
        :award_counts="award_counts"
        :dswd_pending="dswd_pending"
      />

    </div>
    <div class="px-10">
      <div class="py-10 px-3">
        <!-- <ModalNote
          @toggleModal="toggleModal()"
          :showmodal="showModal"
          :status="statusModal"
          @submit-note="submitNote(...arguments)"
        >
          <span slot="title">Add Note</span>
          <span slot="title_textarea">Please enter a note</span>
          <span slot="btn_cancel">Cancel</span>
          <span slot="btn-action">Submit</span>
        </ModalNote> -->

        <ReturnNote
          @toggleModal="toggleModal()"
          :showmodal="showModal"
          :status="statusModal"
          @submit-note="submitNote(...arguments)"
        >
          <span slot="title">Add Note</span>
          <span slot="title_department"
            >Select Department / Office <small>(optional)</small></span
          >
          <span slot="title_textarea">Please enter a note</span>
          <span slot="btn_cancel">Cancel</span>
          <span slot="btn-action">Submit</span>
        </ReturnNote>

        <ModalNoteList
          @toggleModal="toggleModal_notelist()"
          :showmodal="showModal_notelist"
          :status="statusModal"
          @submit-note="submitNote(...arguments)"
          :notes="notes"
        >
          <span slot="title">View Notes</span>
          <span slot="title_textarea">Note List</span>
          <span slot="btn_cancel">Cancel</span>
          <span slot="btn-action">Okay</span>
        </ModalNoteList>
        <div v-if="$auth.user['role'] == roles.TREASURY">
          <!-- 3 -->
          <Treasury_Department
            @view-note="view_note"
            :columns_treasury_cafoa="columns_treasury_cafoa"
            :rows_treasury_cafoa="rows_treasury_cafoa"
            :totalRecords_treasury_cafoa="totalRecords_treasury_cafoa"
            @on-page-change-treasury-cafoa="onPageChange_treasury_cafoa"
            @on-search-treasury-cafoa="onSearch_treasury_cafoa"
            @on-per-page-change-treasury-cafoa="onPerPageChange_treasury_cafoa"
            @on-sort-change-treasury-cafoa="onSortChange_treasury_cafoa"
            @add-note-treasury-cafoa="addNote(...arguments)"
            @manage-treasury-status="manageTreasuryStatus(...arguments)"
            :totalRecords_treasury_voucher="totalRecords_treasury_voucher"
            :columns_treasury_voucher="columns_treasury_voucher"
            :rows_treasury_voucher="rows_treasury_voucher"
            @on-page-change-treasury-voucher="onPageChange_treasury_voucher"
            @on-search-treasury-voucher="onSearch_treasury_voucher"
            @on-per-page-change-treasury-voucher="
              onPerPageChange_treasury_voucher
            "
            @on-sort-change-treasury-voucher="
              onSortChange_treasury_voucher(...arguments)
            "
            @manage-treasurystatus-voucher="
              manageTreasuryStatus_voucher(...arguments)
            "
            @transmit-cafoa-to-accounting="tx_cafoa_to_accounting(...arguments)"
            @transmit-voucher-treasury-to-accounting="
              tx_voucher_treasury_to_accounting(...arguments)
            "
            @manage-treasurymostatus-voucher="
              manageTreasuryMoStatus_voucher(...arguments)
            "
            :totalRecords_treasury_mo_voucher="totalRecords_treasury_mo_voucher"
            :columns_treasury_mo_voucher="columns_treasury_mo_voucher"
            :rows_treasury_mo_voucher="rows_treasury_mo_voucher"
            @on-page-change-treasury-mo-voucher="
              onPageChange_treasury_mo_voucher
            "
            @on-search-treasury-mo-voucher="onSearch_treasury_mo_voucher"
            @on-per-page-change-treasury-mo-voucher="
              onPerPageChange_treasury_mo_voucher
            "
            @on-sort-change-treasury-mo-voucher="
              onSortChange_treasury_mo_voucher(...arguments)
            "
            @transmit-voucher-treasury-to-mayors="
              tx_voucher_treasury_to_mayors(...arguments)
            "
            @release-treasury-check="releaseTreasury_check(...arguments)"
            @release-treasury-multiple="releaseTreasury_multiple(...arguments)"
            @manage-treasury-check-release="
              manageTreasury_check_release(...arguments)
            "
            :totalRecords_treasury_check_release="
              totalRecords_treasury_check_release
            "
            :columns_treasury_check_release="columns_treasury_mo_voucher"
            :rows_treasury_check_release="rows_treasury_check_release"
            @on-page-change-treasury-check-release="
              onPageChange_treasury_check_release
            "
            @on-search-treasury-check-release="onSearch_treasury_check_release"
            @on-per-page-change-treasury-check-release="
              onPerPageChange_treasury_check_release
            "
            @on-sort-change-treasury-check-release="
              onSortChange_treasury_check_release(...arguments)
            "
            @accept-treasury-0="accept_treasury_0(...arguments)"
            @accept-treasury-1="accept_treasury_1(...arguments)"
            @accept-treasury-2="accept_treasury_2(...arguments)"
            @accept-treasury-3="accept_treasury_3(...arguments)"
            @transmit-treasury-1="transmit_treasury_1(...arguments)"
            @transmit-treasury-2="transmit_treasury_2(...arguments)"
            @transmit-treasury-3="transmit_treasury_3(...arguments)"
            @transmit-treasury-4="transmit_treasury_4(...arguments)"
            :totalRecords_treasury_collection="totalRecords_treasury_collection"
            :columns_treasury_collection="columns_treasury_collection"
            :rows_treasury_collection="rows_treasury_collection"
            @on-page-change-treasury-collection="
              onPageChange_treasury_collection
            "
            @on-search-treasury-collection="onSearch_treasury_collection"
            @on-per-page-change-treasury-collection="
              onPerPageChange_treasury_collection
            "
            @on-sort-change-treasury-collection="
              onSortChange_treasury_collection
            "
            @manage-treasury-collection="manage_treasury_collection"
            @accept-treasury-4="accept_treasury_4"
            @manage-treasury-complete="manage_treasury_complete(...arguments)"
            @add-note="addNote(...arguments)"
          />
        </div>
        <div v-else-if="$auth.user['role'] == roles.ACCOUNTING">
          <Accounting_Department
            @view-note="view_note"
            :columns_accounting_cafoa="columns_accounting_cafoa"
            :rows_accounting_cafoa="rows_accounting_cafoa"
            :totalRecords_accounting_cafoa="totalRecords_accounting_cafoa"
            @on-page-change-accounting-cafoa="onPageChange_accounting_cafoa"
            @on-search-accounting-cafoa="onSearch_accounting_cafoa"
            @on-per-page-change-accounting-cafoa="
              onPerPageChange_accounting_cafoa
            "
            @on-sort-change-accounting-cafoa="onSortChange_accounting_cafoa"
            @add-note-accounting-cafoa="addNote(...arguments)"
            @manage-accounting-status-cafoa="
              manageAccountingStatus_cafoa(...arguments)
            "
            @create="create(...arguments, 'accounting')"
            :totalRecords_accounting_voucher="totalRecords_accounting_voucher"
            :columns_accounting_voucher="columns_accounting_voucher"
            :rows_accounting_voucher="rows_accounting_voucher"
            @on-page-change-accounting-voucher="onPageChange_accounting_voucher"
            @on-search-accounting-voucher="onSearch_accounting_voucher"
            @on-per-page-change-accounting-voucher="
              onPerPageChange_accounting_cafoa
            "
            @on-page-sort-accounting-voucher="onSortChange_accounting_voucher"
            @manage-accounting-status-voucher="
              manageAccountingStatus_voucher(...arguments)
            "
            @transmit-cafoa-accounting-to-treasury="
              tx_cafoa_accounting_to_treasury(...arguments)
            "
            @transmit-voucher-accounting-to-mayors="
              tx_voucher_accounting_to_mayors(...arguments)
            "
            :totalRecords_mo_accounting_voucher="
              totalRecords_mo_accounting_voucher
            "
            :columns_mo_accounting_voucher="columns_mo_accounting_voucher"
            :rows_mo_accounting_voucher="rows_mo_accounting_voucher"
            @on-page-change-mo-accounting-voucher="
              onPageChange_mo_accounting_voucher
            "
            @on-search-mo-accounting-voucher="onSearch_mo_accounting_voucher"
            @on-per-page-mo-change-accounting-voucher="
              onPerPageChange_mo_accounting_voucher
            "
            @on-page-sort-mo-accounting-voucher="
              onSortChange_mo_accounting_voucher
            "
            @manage-mo-accounting-status="manageMoAccountingStatus_voucher"
            @accept-accounting-0="accept_accounting_0"
            @accept-accounting-1="accept_accounting_1"
            @accept-accounting-2="accept_accounting_2"
            @transmit-accounting-1="transmit_accounting_1(...arguments)"
            @transmit-accounting-2="transmit_accounting_2(...arguments)"
            @transmit-accounting-3="transmit_accounting_3(...arguments)"
            @add-note="addNote(...arguments)"
          />
        </div>
        <div v-else-if="$auth.user['role'] == roles.MAYOR_AWARDING_CHECK">
          <MayorsAwarding_Department
            :totalRecords_award="totalRecords_award"
            :columns_award="columns_award"
            :rows_award="rows_award"
            @on-page-change-award="onPageChange_award"
            @on-search-award="onSearch_award"
            @on-per-page-award="onPerPageChange_award"
            @on-sort-change-award="onSortChange_award"
            @add-note="addNote(...arguments)"
            @manage-award="manageAward(...arguments)"
            :columns_mayors_approval="columns_mayors_approval"
            :totalRecords_mayors_approval="totalRecords_mayors_approval"
            :rows_mayors_approval="rows_mayors_approval"
            @on-page-change-mayors-approval="onPageChange_mayors_approval"
            @on-search-mayors-approval="onSearch_mayors_approval"
            @on-per-page-mayors-approval="onPerPageChange_mayors_approval"
            @on-sort-change-mayors-approval="onSortChange_mayors_approval"
            @manage-request-approval="manage_request_approval(...arguments)"
            @transmit-to-budget="transmittal_to_budget(...arguments)"
            @transmit-mo-to-accounting="
              transmittal_mo_to_accounting(...arguments)
            "
            @manage-accept-request="manage_accept_request(...arguments)"
            @accept-selected-mayors-signing="accept_selected_mayors_signing"
            @transmit-mo-1="transmittal_mo_1(...arguments)"
            @transmit-mo-2="transmittal_mo_2(...arguments)"
            @accept-selected-approval="accept_selected_approval(...arguments)"
            @accept-mo-1="accept_mo_1(...arguments)"
            @accept-mo-2="accept_mo_2(...arguments)"
            :columns_mo_release="columns_mo_release"
            :totalRecords_mo_release="totalRecords_mo_release"
            :rows_mo_release="rows_mo_release"
            @on-page-change-mo-release="onPageChange_mo_release"
            @on-search-mo-release="onSearch_mo_release"
            @on-per-page-mo-release="onPerPageChange_mo_release"
            @on-sort-change-mo-release="onSortChange_mo_release"
            @manage-mo-3="manage_mo_3"
            @accept-mo-3="accept_mo_3"
            @transmit-mo-3="transmittal_mo_3"
            @release-mayors-multiple="release_mayors_multiple(...arguments)"
            @release-mayors-check="release_mayors_check"
            @view-note="view_note"
          />
        </div>
        <!--  -->
        <div v-else-if="$auth.user['role'] == roles.DSWD">
          <DSWD_or_Mayors_Department
            :columns_dswd="columns_dswd"
            :rows_dswd="rows_dswd"
            :totalRecords_dswd="totalRecords_dswd"
            @on-page-change-dswd="onPageChange_dswd"
            @on-search-dswd="onSearch_dswd"
            @on-per-page-dswd="onPerPageChange_dswd"
            @on-sort-change-dswd="onSortChange_dswd"
          />
        </div>
        <div v-else-if="$auth.user['role'] == roles.ADMIN">
          <DSWD_or_Mayors_Department
            :columns_dswd="columns_dswd"
            :rows_dswd="rows_dswd"
            :totalRecords_dswd="totalRecords_dswd"
            @on-page-change-dswd="onPageChange_dswd"
            @on-search-dswd="onSearch_dswd"
            @on-per-page-dswd="onPerPageChange_dswd"
            @on-sort-change-dswd="onSortChange_dswd"
          />
          <Budget_Department
            :items="items"
            :itemsFor="itemsFor"
            :totalRecords_budget="totalRecords_budget"
            :columns_budget="columns_budget"
            :rows_budget="rows_budget"
            @on-page-change="onPageChange_budget(...arguments)"
            @on-search="onSearch_budget(...arguments)"
            @on-per-page-change="onPerPageChange_budget(...arguments)"
            @on-sort-change="onSortChange_budget(...arguments)"
            @create="create(...arguments, 'budget')"
            @manage-accept-transmittal="manage_accept_transmittal(...arguments)"
            @accept-budget="accept_budget_multiple(...arguments)"
            @view-note="view_note"
          />
          <!-- 1 -->
          <Treasury_Department
            @view-note="view_note"
            :columns_treasury_cafoa="columns_treasury_cafoa"
            :rows_treasury_cafoa="rows_treasury_cafoa"
            :totalRecords_treasury_cafoa="totalRecords_treasury_cafoa"
            @on-page-change-treasury-cafoa="onPageChange_treasury_cafoa"
            @on-search-treasury-cafoa="onSearch_treasury_cafoa"
            @on-per-page-change-treasury-cafoa="onPerPageChange_treasury_cafoa"
            @on-sort-change-treasury-cafoa="onSortChange_treasury_cafoa"
            @add-note-treasury-cafoa="addNote(...arguments)"
            @manage-treasury-status="manageTreasuryStatus(...arguments)"
            :totalRecords_treasury_voucher="totalRecords_treasury_voucher"
            :columns_treasury_voucher="columns_treasury_voucher"
            :rows_treasury_voucher="rows_treasury_voucher"
            @on-page-change-treasury-voucher="onPageChange_treasury_voucher"
            @on-search-treasury-voucher="onSearch_treasury_voucher"
            @on-per-page-change-treasury-voucher="
              onPerPageChange_treasury_voucher
            "
            @on-sort-change-treasury-voucher="
              onSortChange_treasury_voucher(...arguments)
            "
            @manage-treasurystatus-voucher="
              manageTreasuryStatus_voucher(...arguments)
            "
            @transmit-cafoa-to-accounting="tx_cafoa_to_accounting(...arguments)"
            @transmit-voucher-treasury-to-accounting="
              tx_voucher_treasury_to_accounting(...arguments)
            "
            @manage-treasurymostatus-voucher="
              manageTreasuryMoStatus_voucher(...arguments)
            "
            :totalRecords_treasury_mo_voucher="totalRecords_treasury_mo_voucher"
            :columns_treasury_mo_voucher="columns_treasury_mo_voucher"
            :rows_treasury_mo_voucher="rows_treasury_mo_voucher"
            @on-page-change-treasury-mo-voucher="
              onPageChange_treasury_mo_voucher
            "
            @on-search-treasury-mo-voucher="onSearch_treasury_mo_voucher"
            @on-per-page-change-treasury-mo-voucher="
              onPerPageChange_treasury_mo_voucher
            "
            @on-sort-change-treasury-mo-voucher="
              onSortChange_treasury_mo_voucher(...arguments)
            "
            @transmit-voucher-treasury-to-mayors="
              tx_voucher_treasury_to_mayors(...arguments)
            "
            @accept-treasury-0="accept_treasury_0(...arguments)"
            @accept-treasury-1="accept_treasury_1(...arguments)"
            @accept-treasury-2="accept_treasury_2(...arguments)"
            @transmit-treasury-1="transmit_treasury_1(...arguments)"
            @transmit-treasury-2="transmit_treasury_2(...arguments)"
            @transmit-treasury-3="transmit_treasury_3(...arguments)"
            :totalRecords_treasury_collection="totalRecords_treasury_collection"
            :columns_treasury_collection="columns_treasury_collection"
            :rows_treasury_collection="rows_treasury_collection"
            @on-page-change-treasury-collection="
              onPageChange_treasury_collection
            "
            @on-search-treasury-collection="onSearch_treasury_collection"
            @on-per-page-change-treasury-collection="
              onPerPageChange_treasury_collection
            "
            @on-sort-change-treasury-collection="
              onSortChange_treasury_collection
            "
            @manage-treasury-collection="manage_treasury_collection"
            @accept-treasury-4="accept_treasury_4"
            @add-note="addNote(...arguments)"
          />
          <Accounting_Department
            @view-note="view_note"
            :columns_accounting_cafoa="columns_accounting_cafoa"
            :rows_accounting_cafoa="rows_accounting_cafoa"
            :totalRecords_accounting_cafoa="totalRecords_accounting_cafoa"
            @on-page-change-accounting-cafoa="onPageChange_accounting_cafoa"
            @on-search-accounting-cafoa="onSearch_accounting_cafoa"
            @on-per-page-change-accounting-cafoa="
              onPerPageChange_accounting_cafoa
            "
            @on-sort-change-accounting-cafoa="onSortChange_accounting_cafoa"
            @add-note-accounting-cafoa="addNote(...arguments)"
            @manage-accounting-status-cafoa="
              manageAccountingStatus_cafoa(...arguments)
            "
            @create="create(...arguments, 'accounting')"
            :totalRecords_accounting_voucher="totalRecords_accounting_voucher"
            :columns_accounting_voucher="columns_accounting_voucher"
            :rows_accounting_voucher="rows_accounting_voucher"
            @on-page-change-accounting-voucher="onPageChange_accounting_voucher"
            @on-search-accounting-voucher="onSearch_accounting_voucher"
            @on-per-page-change-accounting-voucher="
              onPerPageChange_accounting_cafoa
            "
            @on-page-sort-accounting-voucher="onSortChange_accounting_voucher"
            @manage-accounting-status-voucher="
              manageAccountingStatus_voucher(...arguments)
            "
            @transmit-cafoa-accounting-to-treasury="
              tx_cafoa_accounting_to_treasury(...arguments)
            "
            @transmit-voucher-accounting-to-mayors="
              tx_voucher_accounting_to_mayors(...arguments)
            "
            :totalRecords_mo_accounting_voucher="
              totalRecords_mo_accounting_voucher
            "
            :columns_mo_accounting_voucher="columns_mo_accounting_voucher"
            :rows_mo_accounting_voucher="rows_mo_accounting_voucher"
            @on-page-change-mo-accounting-voucher="
              onPageChange_mo_accounting_voucher
            "
            @on-search-mo-accounting-voucher="onSearch_mo_accounting_voucher"
            @on-per-page-mo-change-accounting-voucher="
              onPerPageChange_mo_accounting_voucher
            "
            @on-page-sort-mo-accounting-voucher="
              onSortChange_mo_accounting_voucher
            "
            @manage-mo-accounting-status="manageMoAccountingStatus_voucher"
            @accept-accounting-0="accept_accounting_0"
            @accept-accounting-1="accept_accounting_1"
            @accept-accounting-2="accept_accounting_2"
            @transmit-accounting-1="transmit_accounting_1(...arguments)"
            @transmit-accounting-2="transmit_accounting_2(...arguments)"
            @transmit-accounting-3="transmit_accounting_3(...arguments)"
            @add-note="addNote(...arguments)"
          />
          <MayorsAwarding_Department
            :totalRecords_award="totalRecords_award"
            :columns_award="columns_award"
            :rows_award="rows_award"
            @on-page-change-award="onPageChange_award"
            @on-search-award="onSearch_award"
            @on-per-page-award="onPerPageChange_award"
            @on-sort-change-award="onSortChange_award"
            @add-note="addNote(...arguments)"
            @manage-award="manageAward(...arguments)"
            :columns_mayors_approval="columns_mayors_approval"
            :totalRecords_mayors_approval="totalRecords_mayors_approval"
            :rows_mayors_approval="rows_mayors_approval"
            @on-page-change-mayors-approval="onPageChange_mayors_approval"
            @on-search-mayors-approval="onSearch_mayors_approval"
            @on-per-page-mayors-approval="onPerPageChange_mayors_approval"
            @on-sort-change-mayors-approval="onSortChange_mayors_approval"
            @manage-request-approval="manage_request_approval(...arguments)"
            @transmit-to-budget="transmittal_to_budget(...arguments)"
            @transmit-mo-to-accounting="
              transmittal_mo_to_accounting(...arguments)
            "
            @manage-accept-request="manage_accept_request(...arguments)"
            @accept-selected-mayors-signing="accept_selected_mayors_signing"
            @transmit-mo-1="transmittal_mo_1(...arguments)"
            @transmit-mo-2="transmittal_mo_2(...arguments)"
            @accept-selected-approval="accept_selected_approval(...arguments)"
            @accept-mo-1="accept_mo_1(...arguments)"
            @accept-mo-2="accept_mo_2(...arguments)"
            :columns_mo_release="columns_mo_release"
            :totalRecords_mo_release="totalRecords_mo_release"
            :rows_mo_release="rows_mo_release"
            @on-page-change-mo-release="onPageChange_mo_release"
            @on-search-mo-release="onSearch_mo_release"
            @on-per-page-mo-release="onPerPageChange_mo_release"
            @on-sort-change-mo-release="onSortChange_mo_release"
            @manage-mo-3="manage_mo_3"
            @accept-mo-3="accept_mo_3"
            @transmit-mo-3="transmittal_mo_3"
            @release-mayors-multiple="release_mayors_multiple(...arguments)"
            @release-mayors-check="release_mayors_check"
            @view-note="view_note"
          />
        </div>
        <!--  -->
        <div v-else-if="$auth.user['role'] == roles.BUDGET">
          <Budget_Department
            :items="items"
            :itemsFor="itemsFor"
            :totalRecords_budget="totalRecords_budget"
            :columns_budget="columns_budget"
            :rows_budget="rows_budget"
            @on-page-change="onPageChange_budget(...arguments)"
            @on-search="onSearch_budget(...arguments)"
            @on-per-page-change="onPerPageChange_budget(...arguments)"
            @on-sort-change="onSortChange_budget(...arguments)"
            @create="create(...arguments, 'budget')"
            @manage-accept-transmittal="manage_accept_transmittal(...arguments)"
            @accept-budget="accept_budget_multiple(...arguments)"
            @transmit-budget-dashboard="transmit_budget_dashboard(...arguments)"
            @view-note="view_note"
            @add-note="addNote(...arguments)"
          />
        </div>
        <div v-else-if="$auth.user['role'] == roles.MANAGER">
          <DSWD_or_Mayors_Department
            :columns_dswd="columns_dswd"
            :rows_dswd="rows_dswd"
            :totalRecords_dswd="totalRecords_dswd"
            @on-page-change-dswd="onPageChange_dswd"
            @on-search-dswd="onSearch_dswd"
            @on-per-page-dswd="onPerPageChange_dswd"
            @on-sort-change-dswd="onSortChange_dswd"
          />
          <Budget_Department
            :items="items"
            :itemsFor="itemsFor"
            :totalRecords_budget="totalRecords_budget"
            :columns_budget="columns_budget"
            :rows_budget="rows_budget"
            @on-page-change="onPageChange_budget(...arguments)"
            @on-search="onSearch_budget(...arguments)"
            @on-per-page-change="onPerPageChange_budget(...arguments)"
            @on-sort-change="onSortChange_budget(...arguments)"
            @create="create(...arguments, 'budget')"
            @manage-accept-transmittal="manage_accept_transmittal(...arguments)"
            @accept-budget="accept_budget_multiple(...arguments)"
            @view-note="view_note"
          />
          <!-- 2 -->
          <Treasury_Department
            @view-note="view_note"
            :columns_treasury_cafoa="columns_treasury_cafoa"
            :rows_treasury_cafoa="rows_treasury_cafoa"
            :totalRecords_treasury_cafoa="totalRecords_treasury_cafoa"
            @on-page-change-treasury-cafoa="onPageChange_treasury_cafoa"
            @on-search-treasury-cafoa="onSearch_treasury_cafoa"
            @on-per-page-change-treasury-cafoa="onPerPageChange_treasury_cafoa"
            @on-sort-change-treasury-cafoa="onSortChange_treasury_cafoa"
            @add-note-treasury-cafoa="addNote(...arguments)"
            @manage-treasury-status="manageTreasuryStatus(...arguments)"
            :totalRecords_treasury_voucher="totalRecords_treasury_voucher"
            :columns_treasury_voucher="columns_treasury_voucher"
            :rows_treasury_voucher="rows_treasury_voucher"
            @on-page-change-treasury-voucher="onPageChange_treasury_voucher"
            @on-search-treasury-voucher="onSearch_treasury_voucher"
            @on-per-page-change-treasury-voucher="
              onPerPageChange_treasury_voucher
            "
            @on-sort-change-treasury-voucher="
              onSortChange_treasury_voucher(...arguments)
            "
            @manage-treasurystatus-voucher="
              manageTreasuryStatus_voucher(...arguments)
            "
            @transmit-cafoa-to-accounting="tx_cafoa_to_accounting(...arguments)"
            @transmit-voucher-treasury-to-accounting="
              tx_voucher_treasury_to_accounting(...arguments)
            "
            @manage-treasurymostatus-voucher="
              manageTreasuryMoStatus_voucher(...arguments)
            "
            :totalRecords_treasury_mo_voucher="totalRecords_treasury_mo_voucher"
            :columns_treasury_mo_voucher="columns_treasury_mo_voucher"
            :rows_treasury_mo_voucher="rows_treasury_mo_voucher"
            @on-page-change-treasury-mo-voucher="
              onPageChange_treasury_mo_voucher
            "
            @on-search-treasury-mo-voucher="onSearch_treasury_mo_voucher"
            @on-per-page-change-treasury-mo-voucher="
              onPerPageChange_treasury_mo_voucher
            "
            @on-sort-change-treasury-mo-voucher="
              onSortChange_treasury_mo_voucher(...arguments)
            "
            @transmit-voucher-treasury-to-mayors="
              tx_voucher_treasury_to_mayors(...arguments)
            "
            @manage-treasury-check-release="
              manageTreasury_check_release(...arguments)
            "
            :totalRecords_treasury_check_release="
              totalRecords_treasury_check_release
            "
            :columns_treasury_check_release="columns_treasury_mo_voucher"
            :rows_treasury_check_release="rows_treasury_check_release"
            @on-page-change-treasury-check-release="
              onPageChange_treasury_check_release
            "
            @on-search-treasury-check-release="onSearch_treasury_check_release"
            @on-per-page-change-treasury-check-release="
              onPerPageChange_treasury_check_release
            "
            @on-sort-change-treasury-check-release="
              onSortChange_treasury_check_release(...arguments)
            "
            @accept-treasury-0="accept_treasury_0(...arguments)"
            @accept-treasury-1="accept_treasury_1(...arguments)"
            @accept-treasury-2="accept_treasury_2(...arguments)"
            @accept-treasury-3="accept_treasury_3(...arguments)"
            @transmit-treasury-1="transmit_treasury_1(...arguments)"
            @transmit-treasury-2="transmit_treasury_2(...arguments)"
            @transmit-treasury-3="transmit_treasury_3(...arguments)"
            @transmit-treasury-4="transmit_treasury_4(...arguments)"
            :totalRecords_treasury_collection="totalRecords_treasury_collection"
            :columns_treasury_collection="columns_treasury_collection"
            :rows_treasury_collection="rows_treasury_collection"
            @on-page-change-treasury-collection="
              onPageChange_treasury_collection
            "
            @on-search-treasury-collection="onSearch_treasury_collection"
            @on-per-page-change-treasury-collection="
              onPerPageChange_treasury_collection
            "
            @on-sort-change-treasury-collection="
              onSortChange_treasury_collection
            "
            @manage-treasury-collection="manage_treasury_collection"
            @accept-treasury-4="accept_treasury_4"
            @add-note="addNote(...arguments)"
          />
          <Accounting_Department
            @view-note="view_note"
            :columns_accounting_cafoa="columns_accounting_cafoa"
            :rows_accounting_cafoa="rows_accounting_cafoa"
            :totalRecords_accounting_cafoa="totalRecords_accounting_cafoa"
            @on-page-change-accounting-cafoa="onPageChange_accounting_cafoa"
            @on-search-accounting-cafoa="onSearch_accounting_cafoa"
            @on-per-page-change-accounting-cafoa="
              onPerPageChange_accounting_cafoa
            "
            @on-sort-change-accounting-cafoa="onSortChange_accounting_cafoa"
            @add-note-accounting-cafoa="addNote(...arguments)"
            @manage-accounting-status-cafoa="
              manageAccountingStatus_cafoa(...arguments)
            "
            @create="create(...arguments, 'accounting')"
            :totalRecords_accounting_voucher="totalRecords_accounting_voucher"
            :columns_accounting_voucher="columns_accounting_voucher"
            :rows_accounting_voucher="rows_accounting_voucher"
            @on-page-change-accounting-voucher="onPageChange_accounting_voucher"
            @on-search-accounting-voucher="onSearch_accounting_voucher"
            @on-per-page-change-accounting-voucher="
              onPerPageChange_accounting_cafoa
            "
            @on-page-sort-accounting-voucher="onSortChange_accounting_voucher"
            @manage-accounting-status-voucher="
              manageAccountingStatus_voucher(...arguments)
            "
            @transmit-cafoa-accounting-to-treasury="
              tx_cafoa_accounting_to_treasury(...arguments)
            "
            @transmit-voucher-accounting-to-mayors="
              tx_voucher_accounting_to_mayors(...arguments)
            "
            :totalRecords_mo_accounting_voucher="
              totalRecords_mo_accounting_voucher
            "
            :columns_mo_accounting_voucher="columns_mo_accounting_voucher"
            :rows_mo_accounting_voucher="rows_mo_accounting_voucher"
            @on-page-change-mo-accounting-voucher="
              onPageChange_mo_accounting_voucher
            "
            @on-search-mo-accounting-voucher="onSearch_mo_accounting_voucher"
            @on-per-page-mo-change-accounting-voucher="
              onPerPageChange_mo_accounting_voucher
            "
            @on-page-sort-mo-accounting-voucher="
              onSortChange_mo_accounting_voucher
            "
            @manage-mo-accounting-status="manageMoAccountingStatus_voucher"
            @accept-accounting-0="accept_accounting_0"
            @accept-accounting-1="accept_accounting_1"
            @accept-accounting-2="accept_accounting_2"
            @transmit-accounting-1="transmit_accounting_1(...arguments)"
            @transmit-accounting-2="transmit_accounting_2(...arguments)"
            @transmit-accounting-3="transmit_accounting_3(...arguments)"
            @add-note="addNote(...arguments)"
          />
          <MayorsAwarding_Department
            :totalRecords_award="totalRecords_award"
            :columns_award="columns_award"
            :rows_award="rows_award"
            @on-page-change-award="onPageChange_award"
            @on-search-award="onSearch_award"
            @on-per-page-award="onPerPageChange_award"
            @on-sort-change-award="onSortChange_award"
            @add-note="addNote(...arguments)"
            @manage-award="manageAward(...arguments)"
            :columns_mayors_approval="columns_mayors_approval"
            :totalRecords_mayors_approval="totalRecords_mayors_approval"
            :rows_mayors_approval="rows_mayors_approval"
            @on-page-change-mayors-approval="onPageChange_mayors_approval"
            @on-search-mayors-approval="onSearch_mayors_approval"
            @on-per-page-mayors-approval="onPerPageChange_mayors_approval"
            @on-sort-change-mayors-approval="onSortChange_mayors_approval"
            @manage-request-approval="manage_request_approval(...arguments)"
            @transmit-to-budget="transmittal_to_budget(...arguments)"
            @transmit-mo-to-accounting="
              transmittal_mo_to_accounting(...arguments)
            "
            @manage-accept-request="manage_accept_request(...arguments)"
            @accept-selected-mayors-signing="
              accept_selected_mayors_signing(...arguments)
            "
            @transmit-mo-1="transmittal_mo_1(...arguments)"
            @transmit-mo-2="transmittal_mo_2(...arguments)"
            @accept-mo-1="accept_mo_1(...arguments)"
            @accept-mo-2="accept_mo_2(...arguments)"
            @accept-selected-approval="accept_selected_approval(...arguments)"
            :columns_mo_release="columns_mo_release"
            :totalRecords_mo_release="totalRecords_mo_release"
            :rows_mo_release="rows_mo_release"
            @on-page-change-mo-release="onPageChange_mo_release"
            @on-search-mo-release="onSearch_mo_release"
            @on-per-page-mo-release="onPerPageChange_mo_release"
            @on-sort-change-mo-release="onSortChange_mo_release"
            @manage-mo-3="manage_mo_3"
            @accept-mo-3="accept_mo_3"
            @transmit-mo-3="transmittal_mo_3"
            @release-mayors-multiple="release_mayors_multiple(...arguments)"
            @release-mayors-check="release_mayors_check"
            @view-note="view_note"
          />
        </div>

        <div
          v-else-if="
            roleId != roles.TREASURY &&
            roleId != roles.ACCOUNTING &&
            roleId != roles.TREASURY &&
            roleId != roles.MAYOR_AWARDING_CHECK &&
            roleId != roles.DSWD
          "
        >
          <h1 class="text-xl font-bold">
            Pending {{ items }} for {{ itemsFor }}s
          </h1>
          <div class="block w-full overflow-x-auto mt-5">
            <vue-good-table
              :search-options="{
                enabled: true,
                trigger: 'enter',
              }"
              mode="remote"
              :totalRows="totalRecords"
              :pagination-options="{
                enabled: true,
                perPageDropdown: [10, 20, 30, 40, 50, 100],
                dropdownAllowAll: false,
              }"
              :columns="columns"
              :rows="rows"
              :line-numbers="true"
            >
              <template slot="table-row" slot-scope="props">
                <span v-if="props.column.field == 'action'">
                  <div class="flex flex-wrap grid grid-cols-2 gap-2">
                    <div class="pr-3">
                      <button
                        type="button"
                        @click="create(props.row.control_number, 'budget')"
                        class="text-xs bg-blue-700 hover:bg-blue-400 text-white font-bold py-2 px-4 rounded"
                      >
                        Create {{ itemsFor }}
                      </button>
                    </div>
                  </div>
                </span>
              </template>
            </vue-good-table>
          </div>
        </div>
        <div v-else>
          <AdminTable
            :cafoa="cafoa"
            :cafoaTotal="cafoaTotal"
            :requests="requests"
            :requestsTotal="requestsTotal"
          />
        </div>
      </div>
      <Footer />
    </div>
  </div>
</template>
<script>
import { treasury_exports_cafoa } from '~/mixins/exports/vuedatatable_treasury_cafoa.js'
import { treasury_exports_voucher } from '~/mixins/exports/vuedatatable_treasury_voucher.js'
import { treasury_mo_exports_voucher } from '~/mixins/exports/vuedatatable_treasury_mo_voucher.js'
import { treasury_exports_check_release } from '~/mixins/exports/vuedatatable_treasury_check_release.js'
import { accounting_exports_cafoa } from '~/mixins/exports/vuedatatable_accounting_cafoa.js'
import { accounting_exports_voucher } from '~/mixins/exports/vuedatatable_accounting_voucher.js'
import { exports_mo_accounting_voucher } from '~/mixins/exports/vuedatatable_mo_accounting_voucher.js'
import { exports_dswd } from '~/mixins/exports/vuedatatable_dswd.js'
import { exports_award } from '~/mixins/exports/vuedatatable_mo_award.js'
import { exports_mayors_approval } from '~/mixins/exports/vuedatatable_mo_approval.js'
import { exports_budget } from '~/mixins/exports/vuedatatable_budget.js'
import { exports_mo_release } from '~/mixins/exports/vuedatatable_mo_release.js'
import { treasury_collection_voucher } from '~/mixins/exports/vuedatatable_treasury_collection.js'

// dashboard
import Treasury_Department from '@/components/Dashboards/treasury.vue'
import Accounting_Department from '@/components/Dashboards/accounting.vue'
import MayorsAwarding_Department from '@/components/Dashboards/mayors_awarding.vue'
import DSWD_or_Mayors_Department from '@/components/Dashboards/dswd_or_mayors.vue'
import Budget_Department from '@/components/Dashboards/budget.vue'
// other components

import AdminTable from '@/components/AdminTable.vue'
import ModalNote from '@/components/Modals/Message.vue'
import roles from '/mixins/data/roles.js'
import const_roles from '~/mixins/constants/roles.js'
import AdminNavbar from '@/components/Navbars/AdminNavbar.vue'
import Sidebar from '@/components/Sidebar/Sidebar.vue'
import Footer from '@/components/Partials/Footer.vue'
import DashStatus from '~/components/Partials/DashStatus.vue'
import ReturnNote from '@/components/Modals/ReturnNote.vue'

import ModalNoteList from '@/components/Modals/Notes.vue'

export default {
  components: {
    Treasury_Department,
    Accounting_Department,
    MayorsAwarding_Department,
    DSWD_or_Mayors_Department,
    Budget_Department,

    AdminNavbar,
    Sidebar,
    Footer,
    DashStatus,
    AdminTable,
    ModalNote,
    ReturnNote,
    ModalNoteList,
  },
  mixins: [
    treasury_exports_cafoa,
    treasury_exports_voucher,
    treasury_mo_exports_voucher,
    treasury_exports_check_release,
    treasury_collection_voucher,
    accounting_exports_cafoa,
    accounting_exports_voucher,
    exports_award,
    exports_dswd,
    exports_budget,
    exports_mayors_approval,
    roles,
    exports_mo_accounting_voucher,
    exports_mo_release,
  ],
  async created() {},
  head() {
    return {
      title: 'Dashboard',
      meta: [
        {
          hid: '',
          name: '',
          content: '',
        },
      ],
    }
  },
  data: () => ({
    notes: [],
    originalIndex: -1,
    currentIndex: -1,
    isActive: false,
    isLoading: false,
    columns: [
      {
        label: 'Control No.',
        field: 'control_number',
      },
      {
        label: 'Status',
        field: 'status',
      },
      {
        label: 'Action',
        field: 'action',
        sortable: false,
      },
      {
        label: 'Date',
        field: 'action',
        sortable: false,
      },
    ],
    rows: [],
    rows_voucher_treasury: [],
    totalRecords: 0,
    serverParams: {
      columnFilters: {},
      sort: [
        {
          field: '',
          type: '',
        },
      ],
      page: 1,
      perPage: 10,
    },
    roleId: null,
    items: 'Requests',
    itemsFor: 'CAFOA',
    redirect: null,
    cafoa: [],
    cafoaTotal: 0,
    requests: [],
    requestsTotal: 0,
    noteControlNumber: false,
    showModal: false,
    showModal_notelist: false,
    statusModal: 'action',

    completed: 0,
    pending: 0,
    completedCafoa: 0,
    completedVoucher: 0,
    pendingRequests: 0,
    pendingCafoa: 0,
    pendingVouchers: 0,
    pendingItem: 'Request',
    completedItem: 'CAFOA',
    award_counts: 0,
    dswd_pending: 0,
    notification_rows: [],

    noteDepartment: 0,
  }),
  middleware: 'auth',
  layout: 'dash_panel',
  async mounted() {
    this.roleId = this.$auth.$state.user['role']
    this.items = 'Requests'
    this.itemsFor = 'CAFOA'
    if (this.roleId == const_roles.BUDGET) {
      this.items = 'Requests'
      this.itemsFor = 'CAFOA'
    } else if (this.roleId == const_roles.TREASURY) {
      this.items = 'Treasury'
      this.itemsFor = 'Treasury'
    } else if (this.roleId == const_roles.ACCOUNTING) {
      this.items = 'CAFOA'
      this.itemsFor = 'Voucher'
    }
    await this.load_notifications()
    await this.fetchDashboard()

    if (
      this.roleId == const_roles.ADMIN ||
      this.roleId == const_roles.MANAGER
    ) {
      await this.loadItems_dswd()
      await this.loadItems_budget()
      await this.loadItems_treasury_cafoa()
      await this.loadItems_treasury_voucher()
      await this.loadItems_treasury_mo_voucher()
      await this.loadItems_accounting_cafoa()
      await this.loadItems_accounting_voucher()
      await this.loadItems_award()
      await this.loadItems_mayors_approval()
      await this.loadItems_mo_accounting_voucher()
      await this.loadItems_mo_release()
      await this.loadItems_treasury_collection()
    } else if (this.roleId == const_roles.BUDGET) {
      await this.loadItems_budget()
    } else if (this.roleId == const_roles.TREASURY) {
      await this.loadItems_treasury_cafoa()
      await this.loadItems_treasury_voucher()
      await this.loadItems_treasury_mo_voucher()
      await this.loadItems_treasury_check_release()
      await this.loadItems_treasury_collection()
    } else if (this.roleId == const_roles.ACCOUNTING) {
      await this.loadItems_accounting_cafoa()
      await this.loadItems_accounting_voucher()
      await this.loadItems_mo_accounting_voucher()
    } else if (this.roleId == const_roles.MAYOR_AWARDING_CHECK) {
      await this.loadItems_award()
      await this.loadItems_mayors_approval()
      await this.loadItems_mo_release()
    } else if (this.roleId == const_roles.DSWD) {
      await this.loadItems_dswd()
    } else {
      // await this.fetchItems()
    }
  },
  async created() {},
  methods: {
    async loadItems_treasury_cafoa() {
      this.$axios
        .$post('/api/cafoa/treasury_1', this.serverParams_treasury_cafoa, {})
        .then((response) => {
          this.totalRecords_treasury_cafoa = response.totalRecords
          var data = []
          for (const i in response.data) {
            data.push({
              id: response.data[i].id,
              control_number: response.data[i].control_number,
              request: response.data[i].request,
              payee: response.data[i].payee,
              approved_amount: response.data[i].approved_amount,
              acceptedStatus: response.data[i].acceptedStatus,
              requesting_official: response.data[i].requesting_official,
              created_at: response.data[i].created,
              treasury_status: response.data[i].treasury_status,
              created: response.data[i].created,
              updated: response.data[i].updated,
            })
          }
          this.rows_treasury_cafoa = data
        })
        .catch((error) => {})
        .finally(() => {})
    },
    async loadItems_treasury_voucher() {
      this.$axios
        .$post(
          // '/api/disbursement/fetchDashboard',
          '/api/disbursement/treasury_2',
          this.serverParams_treasury_voucher,
          {}
        )
        .then((response) => {
          this.totalRecords_treasury_voucher = response.totalRecords
          var data = []
          for (const i in response.data) {
            data.push({
              id: response.data[i].id,
              control_number: response.data[i].control_number,
              payee: response.data[i].payee,
              created_at: response.data[i].created,
              particulars_amount: response.data[i].particulars_amount,
              acceptedStatus: response.data[i].acceptedStatus,
              created: response.data[i].created,
              updated: response.data[i].updated,
            })
          }
          this.rows_treasury_voucher = data
        })
        .catch((error) => {})
        .finally(() => {})
    },

    async loadItems_dswd() {
      this.$axios
        .$post('/api/requestform/fetchDashboard', this.serverParams_dswd, {})
        .then((response) => {
          this.totalRecords_dswd = response.totalRecords
          this.dswd_pending = response.totalRecordsPending
          var data = []
          for (const i in response.data) {
            data.push({
              id: response.data[i].id,
              control_number: response.data[i].control_number,
              payee: response.data[i].payee,
              created: response.data[i].created,
              updated: response.data[i].updated,
            })
          }

          this.rows_dswd = data
        })
        .catch((error) => {})
        .finally(() => {})
    },
    async loadItems_budget() {
      this.$axios
        .$post('/api/dashboard/budget', this.serverParams_budget)
        .then((response) => {
          this.totalRecords_budget = response.totalRecords
          var data = []

          for (const i in response.data) {
            data.push({
              id: response.data[i].id,
              control_number: response.data[i].control_number,
              status: response.data[i].statusLabel,
              payee: response.data[i].payee,
              disbursement_id: response.data[i].disbursementId,
              created: response.data[i].created,
              requestdate: response.data[i].requestday,
              typeofrequest: response.data[i].typeofrequest,
              acceptance: response.data[i].acceptance,
              citizen_name: response.data[i].citizen_name,
              updated: response.data[i].updated,
              amount: response.data[i].approved_amount,
              flag_transmittal_in_budget:
                response.data[i].flag_transmittal_in_budget,
            })
          }

          this.rows_budget = data
        })
        .catch((error) => {})
        .finally(() => {})
    },
    async fetchItems() {
      this.$axios
        .$post('/api/dashboard/pending/' + this.roleId, serverParams_budget, {
          roleId: this.roleId,
        })
        .then((response) => {
          if (
            this.roleId != const_roles.ADMIN &&
            this.roleId != const_roles.TREASURY
          ) {
            this.totalRecords = response.totalRecords
            var data = []

            for (const i in response.data) {
              data.push({
                id: response.data[i].id,
                control_number: response.data[i].control_number,
                status: response.data[i].statusLabel,
                payee: response.data[i].payee,
                disbursement_id: response.data[i].disbursement_vouchers_id,
                created: response.data[i].created,
                updated: response.data[i].updated,
              })
            }

            this.rows = data
          } else {
            this.adminItems(response)
          }
        })
        .catch((error) => {})
        .finally(() => {})
    },

    adminItems(response) {
      this.cafoaTotal = response.cafoaTotal
      var data = []

      for (const i in response.cafoa) {
        data.push({
          id: response.cafoa[i].id,
          control_number: response.cafoa[i].control_number,
          status: response.cafoa[i].statusLabel,
        })
      }

      this.cafoa = data

      this.requestsTotal = response.requestsTotal
      data = []

      for (const i in response.requests) {
        data.push({
          id: response.requests[i].id,
          control_number: response.requests[i].control_number,
          status: response.requests[i].statusLabel,
          created: response.data[i].created,
          updated: response.data[i].updated,
        })
      }

      this.requests = data
    },

    create(controlNo, role) {
      window.localStorage.setItem('controlNumber', JSON.stringify(controlNo))
      if (role == 'budget') {
        this.$router.push('/forms/cafoa/create')
      } else {
        this.$router.push('/forms/disbursement/' + controlNo)
      }
    },

    manageTreasuryStatus(originalItemIndex, status) {
      let treasury_status
      switch (status) {
        case 'accept':
          treasury_status = 1
          break
        case 'submit':
          treasury_status = 2
          break
      }
      this.$axios
        .$post('/api/cafoa/treasury_status/' + treasury_status, {
          id: this.rows_treasury_cafoa[originalItemIndex].id,
          payee: this.rows_treasury_cafoa[originalItemIndex].payee,
          controlNo: this.rows_treasury_cafoa[originalItemIndex].control_number,
        })
        .then((response) => {
          if (treasury_status == 2) {
            this.rows_treasury_cafoa.splice(originalItemIndex, 1)
          } else {
            this.rows_treasury_cafoa[originalItemIndex].acceptedStatus = 1
          }
        })
        .catch((error) => {})
        .finally(() => {})
    },

    manageTreasuryStatus_voucher(originalItemIndex, status) {
      let treasury_status
      switch (status) {
        case 'accept':
          treasury_status = 1
          break
        case 'submit':
          treasury_status = 2
          break
      }
      this.$axios
        .$post('/api/disbursement/treasury_status/' + treasury_status, {
          id: this.rows_treasury_voucher[originalItemIndex].id,
          controlNo:
            this.rows_treasury_voucher[originalItemIndex].control_number,
        })
        .then((response) => {
          if (treasury_status == 2) {
            this.rows_treasury_voucher.splice(originalItemIndex, 1)
          } else {
            this.rows_treasury_voucher[originalItemIndex].acceptedStatus = 1
          }
        })
        .catch((error) => {})
        .finally(() => {})
    },

    async loadItems_accounting_cafoa() {
      this.$axios
        .$post(
          '/api/cafoa/accounting_1',
          this.serverParams_accounting_cafoa,
          {}
        )
        .then((response) => {
          this.totalRecords_accounting_cafoa = response.totalRecords
          var data = []
          for (const i in response.data) {
            data.push({
              id: response.data[i].id,
              control_number: response.data[i].control_number,
              amount: response.data[i].approved_amount,
              payee: response.data[i].payee,
              acceptedStatus: response.data[i].acceptedStatus,
              disbursement_vouchers_id: response.data[i].disbursementId,
              created: response.data[i].created,
              updated: response.data[i].updated,
            })
          }

          this.rows_accounting_cafoa = data
        })
        .catch((error) => {})
        .finally(() => {})
    },

    manageAccountingStatus_cafoa(originalItemIndex, status) {
      let accounting_status
      switch (status) {
        case 'accept':
          accounting_status = 1
          break
        case 'submit':
          accounting_status = 2
          break
      }
      this.$axios
        .$post('/api/cafoa/accounting_status/' + accounting_status, {
          id: this.rows_accounting_cafoa[originalItemIndex].id,
          payee: this.rows_accounting_cafoa[originalItemIndex].payee,
          controlNo:
            this.rows_accounting_cafoa[originalItemIndex].control_number,
        })
        .then((response) => {
          if (accounting_status == 2) {
            this.rows_accounting_cafoa.splice(originalItemIndex, 1)
          } else {
            this.rows_accounting_cafoa[originalItemIndex].acceptedStatus = 1
          }
        })
        .catch((error) => {})
        .finally(() => {})
    },

    async loadItems_accounting_voucher() {
      this.$axios
        .$post(
          '/api/disbursement/accounting_2',
          this.serverParams_accounting_voucher,
          {}
        )
        .then((response) => {
          this.totalRecords_accounting_voucher = response.totalRecords
          var data = []
          for (const i in response.data) {
            data.push({
              id: response.data[i].id,
              control_number: response.data[i].control_number,
              payee: response.data[i].payee,
              acceptedStatus: response.data[i].acceptedStatus,
              created: response.data[i].created,
              updated: response.data[i].updated,
            })
          }

          this.rows_accounting_voucher = data
        })
        .catch((error) => {})
        .finally(() => {})
    },

    manageAccountingStatus_voucher(originalItemIndex, status) {
      let accounting_status
      switch (status) {
        case 'accept':
          accounting_status = 1
          break
        case 'submit':
          accounting_status = 2
          break
      }
      this.$axios
        .$post('/api/disbursement/accounting_status/' + accounting_status, {
          id: this.rows_accounting_voucher[originalItemIndex].id,
          payee: this.rows_accounting_voucher[originalItemIndex].payee,
          controlNo:
            this.rows_accounting_voucher[originalItemIndex].control_number,
        })
        .then((response) => {
          if (accounting_status == 2) {
            this.rows_accounting_voucher.splice(originalItemIndex, 1)
          } else {
            this.rows_accounting_voucher[originalItemIndex].acceptedStatus = 1
          }
        })
        .catch((error) => {})
        .finally(() => {})
    },
    async loadItems_award() {
      this.$axios
        .$post('/api/disbursement/MayorsCA_2', this.serverParams_award, {})
        .then((response) => {
          this.totalRecords_award = response.totalRecords
          var data = []
          for (const i in response.data) {
            data.push({
              id: response.data[i].id,
              control_number: response.data[i].control_number,
              payee: response.data[i].payee,
              request: response.data[i].request,
              approved_amount: response.data[i].approved_amount,
              acceptedStatus: response.data[i].acceptedStatus,
              requestType: response.data[i].requestType,
              created: response.data[i].created,
              updated: response.data[i].updated,
            })
          }

          this.rows_award = data
        })
        .catch((error) => {})
        .finally(() => {})
    },

    manageAward(originalItemIndex, status) {
      let award_status
      switch (status) {
        case 'accept':
          award_status = 1
          break
        case 'award':
          award_status = 2
          break
      }
      this.$axios
        .$post('/api/disbursement/award_status/' + award_status, {
          id: this.rows_award[originalItemIndex].id,
          payee: this.rows_award[originalItemIndex].payee,
          controlNo: this.rows_award[originalItemIndex].control_number,
        })
        .then((response) => {
          if (award_status == 2) {
            this.rows_award[originalItemIndex].acceptedStatus = 2
          } else {
            this.rows_award[originalItemIndex].acceptedStatus = 1
          }
        })
        .catch((error) => {})
        .finally(() => {})
    },

    toggleModal() {
      this.statusModal = 'action'
      this.showModal = !this.showModal
    },
    toggleModal_notelist() {
      this.statusModal_notelist = 'action'
      this.showModal_notelist = !this.showModal_notelist
    },
    async submitNote(note, department) {
      this.noteDepartment = department
      this.$axios
        .$post('/api/papar_trail/addnote', {
          control_number: this.noteControlNumber,
          note: note,
          department: this.noteDepartment,
        })
        .then((response) => {
          this.statusModal = 'done'
          console.log(note)
        })
        .catch((error) => {})
        .finally(() => {})
    },
    addNote(control_number) {
      this.noteControlNumber = control_number
      this.toggleModal()
    },
    async fetchDashboard() {
      this.roleId = this.$auth.$state.user['role']

      this.pendingItem = this.roleId == 4 ? 'REQUESTS' : 'CAFOA'
      this.completedItem = this.roleId == 4 ? 'CAFOA' : 'VOUCHERS'

      this.$axios
        .$post('/api/dashboard/fetch', {
          roleId: this.roleId,
        })
        .then((response) => {
          this.award_counts = response.awardedChecks
          this.completed = response.completed
          this.pending = response.pending
          this.completedCafoa = response.completedCafoa
          this.completedVoucher = response.completedVoucher
          this.pendingRequests = response.pendingRequests
          this.pendingCafoa = response.pendingCafoa
          this.pendingVouchers = response.pendingVouchers
        })
        .catch((error) => {})
        .finally(() => {})
    },
    async loadItems_mayors_approval() {
      this.$axios
        .$post(
          '/api/requestform/MayorsCA_1',
          this.serverParams_mayors_approval,
          {}
        )
        .then((response) => {
          this.totalRecords_mayors_approval = response.totalRecords
          var data = []
          for (const i in response.data) {
            data.push({
              id: response.data[i].id,
              control_number: response.data[i].control_number,
              payee: response.data[i].payee,
              typeofrequest: response.data[i].typeofrequest,
              approved_request: response.data[i].approved_request,
              approved_amount:
                response.data[i].approved_amount == null
                  ? 0
                  : response.data[i].approved_amount,
              acceptance: response.data[i].acceptance,
              requestamount: response.data[i].requestamount,
              created: response.data[i].created,
              updated: response.data[i].updated,
              award_status: response.data[i].award_status,
              accept_request: response.data[i].accept_request,
              acceptance: response.data[i].acceptance,
              flag_transmittal_in_budget:
                response.data[i].flag_transmittal_in_budget,
            })
          }

          this.rows_mayors_approval = data
        })
        .catch((error) => {})
        .finally(() => {})
    },
    manage_request_approval(originalItemIndex) {
      this.$axios
        .$post('/api/requestform/mayors_approval', {
          id: this.rows_mayors_approval[originalItemIndex].id,
        })
        .then((response) => {
          this.rows_mayors_approval[originalItemIndex].approved_amount =
            response.approved_amount
          this.rows_mayors_approval[originalItemIndex].approved_request = 1
        })
        .catch((error) => {})
        .finally(() => {})
    },

    transmittal_to_budget(selectedrows) {
      this.$toast.success('Sending')
      var data = []
      var data_originalindex = []
      let checknonapprovedamount = false
      let counterror = 0

      if (selectedrows) {
        selectedrows.map(function (value, key) {
          if (value['approved_amount'] == 0) {
            checknonapprovedamount = true
            counterror++
          }
          data.push(value['id'])
          data_originalindex.push(value['originalIndex'])
        })
      }

      if (checknonapprovedamount == true) {
        this.$toast.error(
          '( ' +
            counterror +
            ' ) of the selected rows is has no approved amount. Please unselect to transmit.'
        )
        return false
      }

      this.rows_mayors_approval = this.rows_mayors_approval.filter(function (
        value,
        index
      ) {
        return data_originalindex.indexOf(index) == -1
      })

      let payload = new FormData()
      payload.append('transmit_ids', data)
      this.$axios
        .$post('/api/transmit/mo_to_budget', payload, {})
        .then((response) => {
          this.$toast.success('Transmittal form generated.')
          const url =
            this.$config.api + '/downloads/tx_mo_to_budget/' + response.path
          window.location.href = url
          this.$toast.success('Please wait for the download file.')
        })
        .catch((error) => {
          this.$toast.error('Error.')
        })
        .finally(() => {})
    },

    async loadItems_treasury_mo_voucher() {
      this.$axios
        .$post(
          // '/api/disbursement/get_treasury_mo_voucher',
          '/api/disbursement/treasury_3',
          this.serverParams_treasury_mo_voucher,
          {}
        )
        .then((response) => {
          this.totalRecords_treasury_mo_voucher = response.totalRecords
          var data = []
          for (const i in response.data) {
            data.push({
              id: response.data[i].id,
              control_number: response.data[i].control_number,
              particulars_description: response.data[i].particulars_description,
              particulars_amount: response.data[i].particulars_amount,
              payee: response.data[i].payee,
              request: response.data[i].request,
              created: response.data[i].created,
              updated: response.data[i].updated,
              acceptedStatus: response.data[i].acceptedStatus,
            })
          }
          this.rows_treasury_mo_voucher = data
        })
        .catch((error) => {})

        .finally(() => {})
    },

    async loadItems_treasury_check_release() {
      this.$axios
        .$post(
          '/api/disbursement/treasury_4',
          this.serverParams_treasury_check_release,
          {}
        )
        .then((response) => {
          this.totalRecords_treasury_check_release = response.totalRecords
          var data = []
          for (const i in response.data) {
            data.push({
              id: response.data[i].id,
              control_number: response.data[i].control_number,
              particulars_description: response.data[i].particulars_description,
              particulars_amount: response.data[i].particulars_amount,
              payee: response.data[i].payee,
              request: response.data[i].request,
              created: response.data[i].created,
              updated: response.data[i].updated,
              acceptedStatus: response.data[i].acceptedStatus,
              released: response.data[i].released,
            })
          }
          this.rows_treasury_check_release = data
        })
        .catch((error) => {})

        .finally(() => {})
    },

    manageTreasuryMoStatus_voucher(originalItemIndex, status) {
      let treasury_mo_status
      switch (status) {
        case 'accept':
          treasury_mo_status = 1
          break
        case 'submit':
          treasury_mo_status = 2
          break
      }
      this.$axios
        .$post('/api/disbursement/treasury_mo_status/' + treasury_mo_status, {
          id: this.rows_treasury_mo_voucher[originalItemIndex].id,
          controlNo:
            this.rows_treasury_mo_voucher[originalItemIndex].control_number,
        })
        .then((response) => {
          if (treasury_mo_status == 2) {
            this.rows_treasury_mo_voucher.splice(originalItemIndex, 1)
          } else {
            this.rows_treasury_mo_voucher[originalItemIndex].acceptedStatus = 1
          }
        })
        .catch((error) => {})
        .finally(() => {})
    },

    manageTreasury_check_release(originalItemIndex, status) {
      this.$axios
        .$post('/api/disbursement/treasury_release_status', {
          id: this.rows_treasury_check_release[originalItemIndex].id,
          controlNo:
            this.rows_treasury_check_release[originalItemIndex].control_number,
        })
        .then((response) => {
          this.rows_treasury_check_release[originalItemIndex].acceptedStatus = 1
        })
        .catch((error) => {})
        .finally(() => {})
    },

    loadItems_mo_accounting_voucher() {
      this.$axios
        .$post(
          '/api/disbursement/accounting_3',
          this.serverParams_mo_accounting_voucher,
          {}
        )
        .then((response) => {
          this.totalRecords_mo_accounting_voucher = response.totalRecords
          var data = []
          for (const i in response.data) {
            data.push({
              id: response.data[i].id,
              control_number: response.data[i].control_number,
              particulars_description: response.data[i].particulars_description,
              particulars_amount: response.data[i].particulars_amount,
              payee: response.data[i].payee,
              requestType: response.data[i].requestType,
              created: response.data[i].created,
              updated: response.data[i].updated,
              acceptedStatus: response.data[i].acceptedStatus,
            })
          }
          this.rows_mo_accounting_voucher = data
        })
        .catch((error) => {})

        .finally(() => {})
    },

    manageMoAccountingStatus_voucher(originalItemIndex, status) {
      let mo_accounting_status
      switch (status) {
        case 'accept':
          mo_accounting_status = 1
          break
        case 'submit':
          mo_accounting_status = 2
          break
      }

      this.$axios
        .$post(
          '/api/disbursement/mo_accounting_status/' + mo_accounting_status,
          {
            id: this.rows_mo_accounting_voucher[originalItemIndex].id,
            controlNo:
              this.rows_mo_accounting_voucher[originalItemIndex].control_number,
          }
        )
        .then((response) => {
          if (mo_accounting_status == 2) {
            this.rows_mo_accounting_voucher.splice(originalItemIndex, 1)
          } else {
            this.rows_mo_accounting_voucher[
              originalItemIndex
            ].acceptedStatus = 1
          }
        })
        .catch((error) => {})
        .finally(() => {})
    },

    manage_accept_request(originalItemIndex, status) {
      let accept_request
      switch (status) {
        case 'accept':
          accept_request = 1
          break
        case 'submit':
          accept_request = 2
          break
      }
      this.$axios
        .$post('/api/requestform/accept_request/' + accept_request, {
          id: this.rows_mayors_approval[originalItemIndex].id,
          controlNo:
            this.rows_mayors_approval[originalItemIndex].control_number,
        })
        .then((response) => {
          if (accept_request == 2) {
            this.rows_mayors_approval.splice(originalItemIndex, 1)
          } else {
            this.rows_mayors_approval[originalItemIndex].acceptance = 1
          }
        })
        .catch((error) => {})
        .finally(() => {})
    },

    manage_accept_transmittal(originalItemIndex, status) {
      let budget_status
      switch (status) {
        case 'accept':
          budget_status = 1
          break
        case 'submit':
          budget_status = 2
          break
      }
      this.$axios
        .$post('/api/requestform/budget_status/' + budget_status, {
          id: this.rows_budget[originalItemIndex].id,
          controlNo: this.rows_budget[originalItemIndex].control_number,
        })
        .then((response) => {
          if (budget_status == 2) {
            this.rows_budget.splice(originalItemIndex, 1)
          } else {
            this.rows_budget[originalItemIndex].acceptance = 1
          }
        })
        .catch((error) => {})
        .finally(() => {})
    },

    async load_notifications() {
      this.$axios
        .$post('/api/trails/department', {})
        .then((response) => {
          var data = []
          for (const i in response.data) {
            if (response.data[i].date_filter >= 3) {
              data.push({
                id: response.data[i].id,
                control_number: response.data[i].control_number,
                request_date: response.data[i].id,
                overdue: response.data[i].date_filter,
              })
            }
          }

          this.notification_rows = data
        })
        .catch((error) => {})
        .finally(() => {})
    },

    async accept_selected_approval(selectedrows) {
      this.$toast.success('Sending')

      var data = []
      var data_originalindex = []

      let row_already_accepted = false
      let counterror = 0

      if (selectedrows) {
        selectedrows.map(function (value, key) {
          if (value['acceptance'] != 0) {
            row_already_accepted = true
            counterror++
          }

          data.push(value['id'])
          data_originalindex.push({
            item_index: value['originalIndex'],
          })
        })
      }

      if (row_already_accepted == true) {
        this.$toast.error(
          '( ' +
            counterror +
            ' ) of the selected rows has already been accepted.'
        )
        return false
      }

      let payload = new FormData()
      payload.append('transmit_ids', data)

      this.$axios
        .$post('/api/requestform/accept_request_multiple', payload, {})
        .then((response) => {
          if (response) {
            for (const [key, value] of Object.entries(data_originalindex)) {
              this.rows_mayors_approval[value['item_index']].acceptance = 1
            }
          }
          this.$toast.success('Accepted.')
        })
        .catch((error) => {
          this.$toast.error('Error.')
        })
        .finally(() => {})
    },

    async accept_budget_multiple(selectedrows) {
      this.$toast.success('Sending')

      var data = []
      var data_originalindex = []

      let row_already_accepted = false
      let counterror = 0

      if (selectedrows) {
        selectedrows.map(function (value, key) {
          if (value['acceptance'] != 0) {
            row_already_accepted = true
            counterror++
          }

          data.push(value['id'])
          data_originalindex.push({
            item_index: value['originalIndex'],
          })
        })
      }

      if (row_already_accepted == true) {
        this.$toast.error(
          '( ' +
            counterror +
            ' ) of the selected rows has already been accepted.'
        )
        return false
      }

      let payload = new FormData()
      payload.append('transmit_ids', data)

      this.$axios
        .$post('/api/requestform/accept_budget_multiple', payload, {})
        .then((response) => {
          if (response) {
            for (const [key, value] of Object.entries(data_originalindex)) {
              this.rows_budget[value['item_index']].acceptance = 1
            }
          }
          this.$toast.success('Accepted.')
        })
        .catch((error) => {
          this.$toast.error('Error.')
        })
        .finally(() => {})
    },
    accept_treasury_0(selectedrows) {
      this.$toast.success('Sending')

      var data = []
      var data_originalindex = []

      let row_already_accepted = false
      let counterror = 0

      if (selectedrows) {
        selectedrows.map(function (value, key) {
          if (value['acceptedStatus'] != 0) {
            row_already_accepted = true
            counterror++
          }

          data.push(value['id'])
          data_originalindex.push({
            item_index: value['originalIndex'],
          })
        })
      }

      if (row_already_accepted == true) {
        this.$toast.error(
          '( ' +
            counterror +
            ' ) of the selected rows has already been accepted.'
        )
        return false
      }

      let payload = new FormData()
      payload.append('transmit_ids', data)

      this.$axios
        .$post('/api/cafoa/accept_treasury_one_multiple', payload, {})
        .then((response) => {
          if (response) {
            console.log('here')
            for (const [key, value] of Object.entries(data_originalindex)) {
              this.rows_treasury_cafoa[value['item_index']].acceptedStatus = 1
            }
          }
          this.$toast.success('Accepted.')
        })
        .catch((error) => {
          this.$toast.error('Error.')
        })
        .finally(() => {})
    },
    accept_treasury_1(selectedrows) {
      this.$toast.success('Sending')

      var data = []
      var data_originalindex = []

      let row_already_accepted = false
      let counterror = 0

      if (selectedrows) {
        selectedrows.map(function (value, key) {
          if (value['acceptedStatus'] != 0) {
            row_already_accepted = true
            counterror++
          }

          data.push(value['id'])
          data_originalindex.push({
            item_index: value['originalIndex'],
          })
        })
      }

      if (row_already_accepted == true) {
        this.$toast.error(
          '( ' +
            counterror +
            ' ) of the selected rows has already been accepted.'
        )
        return false
      }

      let payload = new FormData()
      payload.append('transmit_ids', data)

      this.$axios
        .$post('/api/disbursement/accept_treasury_two_multiple', payload, {})
        .then((response) => {
          if (response) {
            for (const [key, value] of Object.entries(data_originalindex)) {
              this.rows_treasury_voucher[value['item_index']].acceptedStatus = 1
            }
          }
          this.$toast.success('Accepted.')
        })
        .catch((error) => {
          this.$toast.error('Error.')
        })
        .finally(() => {})
    },
    accept_treasury_2(selectedrows) {
      this.$toast.success('Sending')

      var data = []
      var data_originalindex = []

      let row_already_accepted = false
      let counterror = 0

      if (selectedrows) {
        selectedrows.map(function (value, key) {
          if (value['acceptedStatus'] != 0) {
            row_already_accepted = true
            counterror++
          }

          data.push(value['id'])
          data_originalindex.push({
            item_index: value['originalIndex'],
          })
        })
      }

      if (row_already_accepted == true) {
        this.$toast.error(
          '( ' +
            counterror +
            ' ) of the selected rows has already been accepted.'
        )
        return false
      }

      let payload = new FormData()
      payload.append('transmit_ids', data)

      this.$axios
        .$post('/api/disbursement/accept_treasury_three_multiple', payload, {})
        .then((response) => {
          if (response) {
            for (const [key, value] of Object.entries(data_originalindex)) {
              this.rows_treasury_mo_voucher[
                value['item_index']
              ].acceptedStatus = 1
            }
          }
          this.$toast.success('Accepted.')
        })
        .catch((error) => {
          this.$toast.error('Error.')
        })
        .finally(() => {})
    },

    accept_treasury_3(selectedrows) {
      this.$toast.success('Sending')

      var data = []
      var data_originalindex = []

      let row_already_accepted = false
      let counterror = 0

      if (selectedrows) {
        selectedrows.map(function (value, key) {
          if (value['acceptedStatus'] != 0) {
            row_already_accepted = true
            counterror++
          }

          data.push(value['id'])
          data_originalindex.push({
            item_index: value['originalIndex'],
          })
        })
      }

      if (row_already_accepted == true) {
        this.$toast.error(
          '( ' +
            counterror +
            ' ) of the selected rows has already been accepted.'
        )
        return false
      }

      let payload = new FormData()
      payload.append('transmit_ids', data)

      this.$axios
        .$post('/api/disbursement/accept_treasury_four_multiple', payload, {})
        .then((response) => {
          if (response) {
            for (const [key, value] of Object.entries(data_originalindex)) {
              this.rows_treasury_check_release[
                value['item_index']
              ].acceptedStatus = 1
            }
          }
          this.$toast.success('Accepted.')
        })
        .catch((error) => {
          this.$toast.error('Error.')
        })
        .finally(() => {})
    },

    accept_accounting_0(selectedrows) {
      this.$toast.success('Sending')

      var data = []
      var data_originalindex = []

      let row_already_accepted = false
      let counterror = 0

      if (selectedrows) {
        selectedrows.map(function (value, key) {
          if (value['acceptedStatus'] != 0) {
            row_already_accepted = true
            counterror++
          }

          data.push(value['id'])
          data_originalindex.push({
            item_index: value['originalIndex'],
          })
        })
      }

      if (row_already_accepted == true) {
        this.$toast.error(
          '( ' +
            counterror +
            ' ) of the selected rows has already been accepted.'
        )
        return false
      }

      let payload = new FormData()
      payload.append('transmit_ids', data)

      this.$axios
        .$post('/api/cafoa/accept_accounting_one_multiple', payload, {})
        .then((response) => {
          if (response) {
            for (const [key, value] of Object.entries(data_originalindex)) {
              this.rows_accounting_cafoa[value['item_index']].acceptedStatus = 1
            }
          }
          this.$toast.success('Accepted.')
        })
        .catch((error) => {
          this.$toast.error('Error.')
        })
        .finally(() => {})
    },
    accept_accounting_1(selectedrows) {
      this.$toast.success('Sending')

      var data = []
      var data_originalindex = []

      let row_already_accepted = false
      let counterror = 0

      if (selectedrows) {
        selectedrows.map(function (value, key) {
          if (value['acceptedStatus'] != 0) {
            row_already_accepted = true
            counterror++
          }

          data.push(value['id'])
          data_originalindex.push({
            item_index: value['originalIndex'],
          })
        })
      }

      if (row_already_accepted == true) {
        this.$toast.error(
          '( ' +
            counterror +
            ' ) of the selected rows has already been accepted.'
        )
        return false
      }

      let payload = new FormData()
      payload.append('transmit_ids', data)

      this.$axios
        .$post('/api/disbursement/accept_accounting_two_multiple', payload, {})
        .then((response) => {
          if (response) {
            for (const [key, value] of Object.entries(data_originalindex)) {
              this.rows_accounting_voucher[
                value['item_index']
              ].acceptedStatus = 1
            }
          }
          this.$toast.success('Accepted.')
        })
        .catch((error) => {
          this.$toast.error('Error.')
        })
        .finally(() => {})
    },
    accept_accounting_2(selectedrows) {
      this.$toast.success('Sending')

      var data = []
      var data_originalindex = []

      let row_already_accepted = false
      let counterror = 0

      if (selectedrows) {
        selectedrows.map(function (value, key) {
          if (value['acceptedStatus'] != 0) {
            row_already_accepted = true
            counterror++
          }

          data.push(value['id'])
          data_originalindex.push({
            item_index: value['originalIndex'],
          })
        })
      }

      if (row_already_accepted == true) {
        this.$toast.error(
          '( ' +
            counterror +
            ' ) of the selected rows has already been accepted.'
        )
        return false
      }

      let payload = new FormData()
      payload.append('transmit_ids', data)

      this.$axios
        .$post(
          '/api/disbursement/accept_accounting_three_multiple',
          payload,
          {}
        )
        .then((response) => {
          if (response) {
            for (const [key, value] of Object.entries(data_originalindex)) {
              this.rows_mo_accounting_voucher[
                value['item_index']
              ].acceptedStatus = 1
            }
          }
          this.$toast.success('Accepted.')
        })
        .catch((error) => {
          // this.$toast.error('Error.')
        })
        .finally(() => {})
    },
    accept_selected_mayors_signing(selectedrows) {},

    transmittal_mo_1(selectedrows, status_id) {

      // if (selectedrows.length === 0) {
      //   this.$toast.error('Error.')
      //   this.$toast.error('Please select rows to transmit.')
      //   return 0
      // }
      this.$toast.success('Sending')
      var data = []
      var data_originalindex = []
      var data_controlnumber = []
      let checknonapprovedamount = false
      let counterror = 0

      let flag_transmittal_budget = false
      let flag_counterror = 0
      let status = status_id

      if (selectedrows) {
        selectedrows.map(function (value, key) {
          if (value['flag_transmittal_in_budget'] == 0 && status > 3) {
            flag_transmittal_budget = true
            flag_counterror++
          }

          if (value['approved_amount'] == 0) {
            checknonapprovedamount = true
            counterror++
          }
          data.push(value['id'])
          data_originalindex.push(value['originalIndex'])
          data_controlnumber.push(value['control_number'])
        })
      }

      if (flag_transmittal_budget == true) {
        this.$toast.error(
          '( ' +
            flag_counterror +
            ' ) of the selected row cannot be transmitted because transmittal must be processed in budget department first.'
        )
        return false
      }

      if (checknonapprovedamount == true) {
        this.$toast.error(
          '( ' +
            counterror +
            ' ) of the selected rows is has no approved amount. Please unselect to transmit.'
        )
        return false
      }

      this.rows_mayors_approval = this.rows_mayors_approval.filter(function (
        value,
        index
      ) {
        return data_originalindex.indexOf(index) == -1
      })

      let payload = new FormData()
      payload.append('status', status_id)
      payload.append('transmit_ids', data)
      payload.append('transmit_controlnumber', data_controlnumber)

      this.$axios
        .$post('/api/tx/universal', payload, {})
        .then((response) => {
          this.$toast.success('Transmittal form generated.')
          const url =
            this.$config.api + '/download_transmittal/' + response.path
          window.open(url)
        })
        .catch((error) => {
          this.$toast.error('Error.')
        })
        .finally(() => {})
    },
    transmittal_mo_2(selectedrows, status_id) {
      this.$toast.success('Sending')
      var data = []
      var data_originalindex = []
      var data_controlnumber = []

      let non_accepted_mo_accounting_status = false
      let counterror = 0

      if (selectedrows) {
        selectedrows.map(function (value, key) {
          if (value['acceptedStatus'] == 0) {
            non_accepted_mo_accounting_status = true
            counterror++
          }

          data.push(value['id'])
          data_originalindex.push(value['originalIndex'])
          data_controlnumber.push(value['control_number'])
        })
      }

      if (non_accepted_mo_accounting_status == true) {
        this.$toast.error(
          '( ' +
            counterror +
            ' ) of the selected rows have not been accepted yet. Please unselect to transmit.'
        )
        return false
      }

      this.rows_award = this.rows_award.filter(function (value, index) {
        return data_originalindex.indexOf(index) == -1
      })

      let payload = new FormData()
      payload.append('status', status_id)
      payload.append('transmit_ids', data)
      payload.append('transmit_controlnumber', data_controlnumber)
      this.$axios
        .$post('/api/tx/universal', payload, {})
        .then((response) => {
          this.$toast.success('Transmittal form generated.')
          const url =
            this.$config.api + '/download_transmittal/' + response.path
          window.open(url)
        })
        .catch((error) => {
          this.$toast.error('Error.')
        })
        .finally(() => {})
    },
    accept_mo_1(selectedrows) {
      this.$toast.success('Sending')

      var data = []
      var data_originalindex = []

      let row_already_accepted = false
      let counterror = 0

      if (selectedrows) {
        selectedrows.map(function (value, key) {
          if (value['acceptance'] != 0) {
            row_already_accepted = true
            counterror++
          }

          data.push(value['id'])
          data_originalindex.push({
            item_index: value['originalIndex'],
          })
        })
      }

      if (row_already_accepted == true) {
        this.$toast.error(
          '( ' +
            counterror +
            ' ) of the selected rows has already been accepted.'
        )
        return false
      }

      let payload = new FormData()
      payload.append('transmit_ids', data)

      this.$axios
        .$post('/api/accept/multiple', payload, {})
        .then((response) => {
          if (response) {
            for (const [key, value] of Object.entries(data_originalindex)) {
              this.rows_mayors_approval[value['item_index']].acceptance = 1
            }
          }
          this.$toast.success('Accepted.')
        })
        .catch((error) => {
          this.$toast.error('Error.')
        })
        .finally(() => {})
    },
    accept_mo_2(selectedrows) {
      this.$toast.success('Sending')
      var data = []
      var data_originalindex = []
      let row_already_accepted = false
      let counterror = 0
      if (selectedrows) {
        selectedrows.map(function (value, key) {
          if (value['acceptedStatus'] != 0) {
            row_already_accepted = true
            counterror++
          }
          data.push(value['id'])
          data_originalindex.push({
            item_index: value['originalIndex'],
          })
        })
      }
      if (row_already_accepted == true) {
        this.$toast.error(
          '( ' +
            counterror +
            ' ) of the selected rows has already been accepted.'
        )
        return false
      }
      let payload = new FormData()
      payload.append('transmit_ids', data)
      this.$axios
        .$post('/api/disbursement/accept_mayors_two_multiple', payload, {})
        .then((response) => {
          if (response) {
            for (const [key, value] of Object.entries(data_originalindex)) {
              this.rows_award[value['item_index']].acceptedStatus = 1
            }
          }
          this.$toast.success('Accepted.')
        })
        .catch((error) => {
          this.$toast.error('Error.')
        })
        .finally(() => {})
    },
    transmit_treasury_1(selectedrows, status_id) {
      this.$toast.success('Sending')
      var data = []
      var data_originalindex = []
      var data_controlnumber = []
      let non_accepted_treasury_status = false
      let counterror = 0
      if (selectedrows) {
        selectedrows.map(function (value, key) {
          if (value['accepted'] == 0) {
            non_accepted_treasury_status = true
            counterror++
          }
          data.push(value['id'])
          data_originalindex.push(value['originalIndex'])
          data_controlnumber.push(value['control_number'])
        })
      }

      if (non_accepted_treasury_status == true) {
        this.$toast.error(
          '( ' +
            counterror +
            ' ) of the selected rows have not been accepted yet.'
        )
        return false
      }

      this.rows_treasury_cafoa = this.rows_treasury_cafoa.filter(function (
        value,
        index
      ) {
        return data_originalindex.indexOf(index) == -1
      })

      let payload = new FormData()
      payload.append('transmit_ids', data)
      payload.append('status', status_id)
      payload.append('transmit_controlnumber', data_controlnumber)
      this.$axios
        .$post('/api/tx/universal', payload, {})
        .then((response) => {
          this.$toast.success('Transmittal form generated.')
          const url =
            this.$config.api + '/download_transmittal/' + response.path
          window.open(url)
        })
        .catch((error) => {
          this.$toast.error('Error.')
        })
        .finally(() => {})
    },
    transmit_treasury_2(selectedrows, status_id) {
      this.$toast.success('Sending')
      var data = []
      var data_originalindex = []
      var data_controlnumber = []
      let non_acceptedtreasurystatus = false
      let counterror = 0
      if (selectedrows) {
        selectedrows.map(function (value, key) {
          if (value['acceptedStatus'] == 0) {
            non_acceptedtreasurystatus = true
            counterror++
          }
          data.push(value['id'])
          data_originalindex.push(value['originalIndex'])
          data_controlnumber.push(value['control_number'])
        })
      }
      // treasury_status

      if (non_acceptedtreasurystatus == true) {
        this.$toast.error(
          '( ' +
            counterror +
            ' ) of the selected rows have not been accepted yet. Please unselect to transmit.'
        )
        return false
      }
      this.rows_treasury_voucher = this.rows_treasury_voucher.filter(function (
        value,
        index
      ) {
        return data_originalindex.indexOf(index) == -1
      })

      let payload = new FormData()
      payload.append('transmit_ids', data)
      payload.append('status', status_id)
      payload.append('transmit_controlnumber', data_controlnumber)
      this.$axios
        .$post('/api/tx/universal', payload, {})
        .then((response) => {
          this.$toast.success('Transmittal form generated.')
          const url =
            this.$config.api + '/download_transmittal/' + response.path
          window.open(url)
        })
        .catch((error) => {
          this.$toast.error('Error.')
        })
        .finally(() => {})
    },
    transmit_treasury_3(selectedrows, status_id) {
      this.$toast.success('Sending')
      var data = []
      var data_originalindex = []
      var data_controlnumber = []

      let non_accepted_treasury_mo_status = false
      let counterror = 0

      if (selectedrows) {
        selectedrows.map(function (value, key) {
          if (value['acceptedStatus'] == 0) {
            non_accepted_treasury_mo_status = true
            counterror++
          }

          data.push(value['id'])
          data_originalindex.push(value['originalIndex'])
          data_controlnumber.push(value['control_number'])
        })
      }

      if (non_accepted_treasury_mo_status == true) {
        this.$toast.error(
          '( ' +
            counterror +
            ' ) of the selected rows have not been accepted yet. Please unselect to transmit.'
        )
        return false
      }

      this.rows_treasury_mo_voucher = this.rows_treasury_mo_voucher.filter(
        function (value, index) {
          return data_originalindex.indexOf(index) == -1
        }
      )

      let payload = new FormData()
      payload.append('transmit_ids', data)
      payload.append('status', status_id)
      payload.append('transmit_controlnumber', data_controlnumber)
      this.$axios
        .$post('/api/tx/universal', payload, {})
        .then((response) => {
          this.$toast.success('Transmittal form generated.')
          const url =
            this.$config.api + '/download_transmittal/' + response.path
          window.open(url)
        })
        .catch((error) => {
          this.$toast.error('Error.')
        })
        .finally(() => {})
    },
    transmit_treasury_4(selectedrows, status_id) {
      this.$toast.success('Sending')
      var data = []
      var data_originalindex = []
      var data_controlnumber = []
      let non_accepted_treasury_mo_status = false
      let counterror = 0

      if (selectedrows) {
        selectedrows.map(function (value, key) {
          if (value['acceptedStatus'] == 0) {
            non_accepted_treasury_mo_status = true
            counterror++
          }

          data.push(value['id'])
          data_originalindex.push(value['originalIndex'])
          data_controlnumber.push(value['control_number'])
        })
      }

      if (non_accepted_treasury_mo_status == true) {
        this.$toast.error(
          '( ' +
            counterror +
            ' ) of the selected rows have not been accepted yet. Please unselect to transmit.'
        )
        return false
      }

      this.rows_treasury_check_release =
        this.rows_treasury_check_release.filter(function (value, index) {
          return data_originalindex.indexOf(index) == -1
        })

      let payload = new FormData()
      payload.append('transmit_ids', data)
      payload.append('status', status_id)
      payload.append('transmit_controlnumber', data_controlnumber)
      this.$axios
        .$post('/api/tx/universal', payload, {})
        .then((response) => {
          this.loadItems_treasury_collection();
          this.$toast.success('Transmittal form generated.')
          const url =
            this.$config.api + '/download_transmittal/' + response.path
          window.open(url)
        })
        .catch((error) => {
          this.$toast.error('Error.')
        })
        .finally(() => {})
    },
    transmit_accounting_1(selectedrows, status_id) {
      this.$toast.success('Sending')
      var data = []
      var data_originalindex = []
      var data_controlnumber = []
      let non_acceptedaccountingstatus = false
      let counterror = 0

      if (selectedrows) {
        selectedrows.map(function (value, key) {
          if (value['acceptance'] == 0) {
            non_acceptedaccountingstatus = true
            counterror++
          }
          data.push(value['id'])
          data_originalindex.push(value['originalIndex'])
          data_controlnumber.push(value['control_number'])
        })
      }
      if (non_acceptedaccountingstatus == true) {
        this.$toast.error(
          '( ' +
            counterror +
            ' ) of the selected rows have not been accepted yet. Please unselect to transmit.'
        )
        return false
      }
      this.rows_accounting_cafoa = this.rows_accounting_cafoa.filter(function (
        value,
        index
      ) {
        return data_originalindex.indexOf(index) == -1
      })

      let payload = new FormData()
      payload.append('transmit_ids', data)
      payload.append('status', status_id)
      payload.append('transmit_controlnumber', data_controlnumber)
      this.$axios
        .$post('/api/tx/universal', payload, {})
        .then((response) => {
          this.$toast.success('Transmittal form generated.')
          const url =
            this.$config.api + '/download_transmittal/' + response.path
          window.open(url)
        })
        .catch((error) => {
          this.$toast.error('Error.')
        })
        .finally(() => {})
    },
    transmit_accounting_2(selectedrows, status_id) {
      this.$toast.success('Sending')
      var data = []
      var data_originalindex = []
      var data_controlnumber = []
      let non_acceptedaccountingstatus = false
      let counterror = 0

      if (selectedrows) {
        selectedrows.map(function (value, key) {
          if (value['acceptedStatus'] == 0) {
            non_acceptedaccountingstatus = true
            counterror++
          }

          data.push(value['id'])
          data_originalindex.push(value['originalIndex'])
          data_controlnumber.push(value['control_number'])
        })
      }

      if (non_acceptedaccountingstatus == true) {
        this.$toast.error(
          '( ' +
            counterror +
            ' ) of the selected rows have not been accepted yet. Please unselect to transmit.'
        )
        return false
      }

      this.rows_accounting_voucher = this.rows_accounting_voucher.filter(
        function (value, index) {
          return data_originalindex.indexOf(index) == -1
        }
      )

      let payload = new FormData()
      payload.append('transmit_ids', data)
      payload.append('status', status_id)
      payload.append('transmit_controlnumber', data_controlnumber)
      this.$axios
        .$post('/api/tx/universal', payload, {})
        .then((response) => {
          this.$toast.success('Transmittal form generated.')
          const url =
            this.$config.api + '/download_transmittal/' + response.path
          window.open(url)
        })
        .catch((error) => {
          this.$toast.error('Error.')
        })
        .finally(() => {})
    },
    transmit_accounting_3(selectedrows, status_id) {
      this.$toast.success('Sending')
      var data = []
      var data_originalindex = []
      var data_controlnumber = []
      let non_acceptedaccountingstatus = false
      let counterror = 0

      if (selectedrows) {
        selectedrows.map(function (value, key) {
          if (value['acceptedStatus'] == 0) {
            non_acceptedaccountingstatus = true
            counterror++
          }

          data.push(value['id'])
          data_originalindex.push(value['originalIndex'])
          data_controlnumber.push(value['control_number'])
        })
      }

      if (non_acceptedaccountingstatus == true) {
        this.$toast.error(
          '( ' +
            counterror +
            ' ) of the selected rows have not been accepted yet. Please unselect to transmit.'
        )
        return false
      }

      this.rows_mo_accounting_voucher = this.rows_mo_accounting_voucher.filter(
        function (value, index) {
          return data_originalindex.indexOf(index) == -1
        }
      )

      let payload = new FormData()
      payload.append('transmit_ids', data)
      payload.append('status', status_id)
      payload.append('transmit_controlnumber', data_controlnumber)
      this.$axios
        .$post('/api/tx/universal', payload, {})
        .then((response) => {
          this.$toast.success('Transmittal form generated.')
          const url =
            this.$config.api + '/download_transmittal/' + response.path
          window.open(url)
        })
        .catch((error) => {
          this.$toast.error('Error.')
        })
        .finally(() => {})
    },
    releaseTreasury_check(index, controlNo) {
      this.$axios
        .$post(
          '/api/disbursement/treasury_release_check',
          {
            controlNo: controlNo,
          },
          {}
        )
        .then((response) => {
          this.rows_treasury_check_release[index].released = 1
        })
        .catch((error) => {
          this.$toast.error('Error.')
        })
        .finally(() => {})
    },
    releaseTreasury_multiple(selectedrows) {
      this.$toast.success('Processing...')

      var data = []
      var data_originalindex = []

      let row_already_accepted = false
      let counterror = 0

      if (selectedrows) {
        selectedrows.map(function (value, key) {
          if (value['released'] != 0) {
            row_already_accepted = true
            counterror++
          }

          data.push(value['id'])
          data_originalindex.push({
            item_index: value['originalIndex'],
          })
        })
      }

      if (row_already_accepted == true) {
        this.$toast.error(
          '( ' +
            counterror +
            ' ) of the selected rows has already been released.'
        )
        return false
      }

      let payload = new FormData()
      payload.append('transmit_ids', data)

      this.$axios
        .$post('/api/disbursement/treasury_release_check_multiple', payload, {})
        .then((response) => {
          if (response) {
            console.log('here')
            for (const [key, value] of Object.entries(data_originalindex)) {
              this.rows_treasury_check_release[value['item_index']].released = 1
            }
          }
          this.$toast.success('Bank Checks successfully released.')
        })
        .catch((error) => {
          this.$toast.error('Error.')
        })
        .finally(() => {})
    },
    async loadItems_mo_release() {
      this.$axios
        .$post('/api/disbursement/MayorsCA_3', this.serverParams_award, {})
        .then((response) => {
          this.totalRecords_mo_release = response.totalRecords
          var data = []
          for (const i in response.data) {
            data.push({
              id: response.data[i].id,
              control_number: response.data[i].control_number,
              payee: response.data[i].payee,
              request: response.data[i].request,
              approved_amount: response.data[i].approved_amount,
              acceptedStatus: response.data[i].acceptedStatus,
              requestType: response.data[i].requestType,
              created: response.data[i].created,
              updated: response.data[i].updated,
              released: response.data[i].released,
            })
          }

          this.rows_mo_release = data
        })
        .catch((error) => {})
        .finally(() => {})
    },

    manage_mo_3(originalItemIndex, status) {
      let stat
      switch (status) {
        case 'accept':
          stat = 1
          break
        case 'submit':
          stat = 2
          break
      }
      this.$axios
        .$post('/api/disbursement/status_mo_3/' + stat, {
          id: this.rows_mo_release[originalItemIndex].id,
          payee: this.rows_mo_release[originalItemIndex].payee,
          controlNo: this.rows_mo_release[originalItemIndex].control_number,
        })
        .then((response) => {
          if (stat == 2) {
            this.rows_mo_release.splice(originalItemIndex, 1)
          } else {
            this.rows_mo_release[originalItemIndex].acceptedStatus = 1
          }
        })
        .catch((error) => {})
        .finally(() => {})
    },
    accept_mo_3(selectedrows) {
      this.$toast.success('Sending')
      var data = []
      var data_originalindex = []
      let row_already_accepted = false
      let counterror = 0
      if (selectedrows) {
        selectedrows.map(function (value, key) {
          if (value['acceptedStatus'] != 0) {
            row_already_accepted = true
            counterror++
          }
          data.push(value['id'])
          data_originalindex.push({
            item_index: value['originalIndex'],
          })
        })
      }
      if (row_already_accepted == true) {
        this.$toast.error(
          '( ' +
            counterror +
            ' ) of the selected rows has already been accepted.'
        )
        return false
      }
      let payload = new FormData()
      payload.append('transmit_ids', data)
      this.$axios
        .$post('/api/disbursement/accept_mo_3_miltiple', payload, {})
        .then((response) => {
          if (response) {
            for (const [key, value] of Object.entries(data_originalindex)) {
              this.rows_mo_release[value['item_index']].acceptedStatus = 1
            }
          }
          this.$toast.success('Accepted.')
        })
        .catch((error) => {
          this.$toast.error('Error.')
        })
        .finally(() => {})
    },
    transmittal_mo_3(selectedrows, status_id) {
      this.$toast.success('Sending')
      var data = []
      var data_originalindex = []
      var data_controlnumber = []
      let non_accepted_mo_accounting_status = false
      let counterror = 0

      if (selectedrows) {
        selectedrows.map(function (value, key) {
          if (value['acceptedStatus'] == 0) {
            non_accepted_mo_accounting_status = true
            counterror++
          }

          data.push(value['id'])
          data_originalindex.push(value['originalIndex'])
          data_controlnumber.push(value['control_number'])
        })
      }

      if (non_accepted_mo_accounting_status == true) {
        this.$toast.error(
          '( ' +
            counterror +
            ' ) of the selected rows have not been accepted yet. Please unselect to transmit.'
        )
        return false
      }

      this.rows_mo_release = this.rows_mo_release.filter(function (
        value,
        index
      ) {
        return data_originalindex.indexOf(index) == -1
      })

      let payload = new FormData()
      payload.append('status', status_id)
      payload.append('transmit_ids', data)
      payload.append('transmit_controlnumber', data_controlnumber)
      this.$axios
        .$post('/api/tx/universal', payload, {})
        .then((response) => {
          this.$toast.success('Transmittal form generated.')
          const url =
            this.$config.api + '/download_transmittal/' + response.path
          window.open(url)
        })
        .catch((error) => {
          this.$toast.error('Error.')
        })
        .finally(() => {})
    },

    async loadItems_treasury_collection() {
      this.$axios
        .$post(
          '/api/disbursement/treasury_5',
          this.serverParams_treasury_collection,
          {}
        )
        .then((response) => {
          this.totalRecords_treasury_collection = response.totalRecords
          var data = []
          for (const i in response.data) {
            data.push({
              id: response.data[i].id,
              control_number: response.data[i].control_number,
              particulars_description: response.data[i].particulars_description,
              particulars_amount: response.data[i].particulars_amount,
              payee: response.data[i].payee,
              request: response.data[i].request,
              created: response.data[i].created,
              updated: response.data[i].updated,
              acceptedStatus: response.data[i].acceptedStatus,
              released: response.data[i].released,
              completed: response.data[i].completed,
            })
          }
          this.rows_treasury_collection = data
        })
        .catch((error) => {})

        .finally(() => {})
    },

    manage_treasury_collection(originalItemIndex, status) {
      let stat
      switch (status) {
        case 'accept':
          stat = 1
          break
        case 'submit':
          stat = 2
          break
      }
      this.$axios
        .$post('/api/disbursement/treasury_status_5/' + stat, {
          id: this.rows_treasury_collection[originalItemIndex].id,
          payee: this.rows_treasury_collection[originalItemIndex].payee,
          controlNo:
            this.rows_treasury_collection[originalItemIndex].control_number,
        })
        .then((response) => {
          if (stat == 2) {
            this.rows_treasury_collection.splice(originalItemIndex, 1)
          } else {
            this.rows_treasury_collection[originalItemIndex].acceptedStatus = 1
          }
        })
        .catch((error) => {})
        .finally(() => {})
    },
    accept_treasury_4(selectedrows) {
      this.$toast.success('Sending')

      var data = []
      var data_originalindex = []

      let row_already_accepted = false
      let counterror = 0

      if (selectedrows) {
        selectedrows.map(function (value, key) {
          if (value['acceptedStatus'] != 0) {
            row_already_accepted = true
            counterror++
          }

          data.push(value['id'])
          data_originalindex.push({
            item_index: value['originalIndex'],
          })
        })
      }

      if (row_already_accepted == true) {
        this.$toast.error(
          '( ' +
            counterror +
            ' ) of the selected rows has already been accepted.'
        )
        return false
      }

      let payload = new FormData()
      payload.append('transmit_ids', data)

      this.$axios
        .$post('/api/disbursement/accept_treasury_five_multiple', payload, {})
        .then((response) => {
          if (response) {
            for (const [key, value] of Object.entries(data_originalindex)) {
              this.rows_treasury_collection[
                value['item_index']
              ].acceptedStatus = 1
            }
          }
          this.$toast.success('Accepted.')
        })
        .catch((error) => {
          this.$toast.error('Error.')
        })
        .finally(() => {})
    },

    release_mayors_multiple(selectedrows) {
      this.$toast.success('Processing...')

      var data = []
      var data_originalindex = []

      let row_already_accepted = false
      let counterror = 0

      if (selectedrows) {
        selectedrows.map(function (value, key) {
          if (value['released'] != 0) {
            row_already_accepted = true
            counterror++
          }

          data.push(value['id'])
          data_originalindex.push({
            item_index: value['originalIndex'],
          })
        })
      }

      if (row_already_accepted == true) {
        this.$toast.error(
          '( ' +
            counterror +
            ' ) of the selected rows has already been released.'
        )
        return false
      }

      let payload = new FormData()
      payload.append('transmit_ids', data)

      this.$axios
        .$post('/api/disbursement/mayors_release_check_multiple', payload, {})
        .then((response) => {
          if (response) {
            console.log('here')
            for (const [key, value] of Object.entries(data_originalindex)) {
              this.rows_mo_release[value['item_index']].released = 1
            }
          }
          this.$toast.success('Bank Checks successfully released.')
        })
        .catch((error) => {
          this.$toast.error('Error.')
        })
        .finally(() => {})
    },
    release_mayors_check(index, controlNo) {
      this.$axios
        .$post(
          '/api/disbursement/treasury_release_check',
          {
            controlNo: controlNo,
          },
          {}
        )
        .then((response) => {
          this.rows_mo_release[index].released = 1
        })
        .catch((error) => {
          this.$toast.error('Error.')
        })
        .finally(() => {})
    },
    transmit_budget_dashboard(selectedrows, status_id) {
      this.$toast.success('Sending')
      var data = []
      var data_originalindex = []
      var data_controlnumber = []
      let non_accepted_mo_accounting_status = false
      let counterror = 0

      let flag_transmittal_budget = false
      let flag_counterror = 0
      let status = status_id

      if (selectedrows) {
        selectedrows.map(function (value, key) {
          if (value['flag_transmittal_in_budget'] == 0 && status > 3) {
            flag_transmittal_budget = true
            flag_counterror++
          }

          if (value['acceptedStatus'] == 0) {
            non_accepted_mo_accounting_status = true
            counterror++
          }

          data.push(value['id'])
          data_originalindex.push(value['originalIndex'])
          data_controlnumber.push(value['control_number'])
        })
      }

      if (flag_transmittal_budget == true) {
        this.$toast.error(
          '( ' +
            flag_counterror +
            ' ) of the selected row cannot be transmitted because transmittal must be processed in budget department first.'
        )
        return false
      }

      if (non_accepted_mo_accounting_status == true) {
        this.$toast.error(
          '( ' +
            counterror +
            ' ) of the selected rows have not been accepted yet. Please unselect to transmit.'
        )
        return false
      }

      this.rows_budget = this.rows_budget.filter(function (value, index) {
        return data_originalindex.indexOf(index) == -1
      })

      let payload = new FormData()
      payload.append('status', status_id)
      payload.append('transmit_ids', data)
      payload.append('transmit_controlnumber', data_controlnumber)
      this.$axios
        .$post('/api/tx/universal', payload, {})
        .then((response) => {
          this.$toast.success('Transmittal form generated.')
          const url =
            this.$config.api + '/download_transmittal/' + response.path
          window.open(url)
        })
        .catch((error) => {
          this.$toast.error('Error.')
        })
        .finally(() => {})
    },
    view_note(control_number) {
      this.$axios
        .$get('/api/notes/control_number/' + control_number, {})
        .then((response) => {
          console.log(response.data)
          this.notes = response.data
        })
        .catch((error) => {})
        .finally(() => {})

      console.log(control_number)
      this.toggleModal_notelist()
    },
    manage_treasury_complete(index, controlNo) {
      this.$axios
        .$post(
          '/api/disbursement/treasury_complete',
          {
            controlNo: controlNo,
          },
          {}
        )
        .then((response) => {
          this.rows_treasury_collection[index].completed = 1
        })
        .catch((error) => {
          this.$toast.error('Error.')
        })
        .finally(() => {})
    },
  },
}
</script>
