import Modal from '../components/modal/modal.js';
import DropdownMenu from "../components/dropdownMenu/dropdownMenu.js";

const inviteMemberModal = new Modal('modal-invite-member');
const btnOpenInviteModal = document.querySelector('.open-invite-modal');
btnOpenInviteModal.addEventListener('click', () => inviteMemberModal.open());

const deleteMemberModal = new Modal('modal-delete-member');
const btnOpenDeleteModal = document.querySelector('.open-delete-modal');
btnOpenDeleteModal.addEventListener('click', () => deleteMemberModal.open());

const uploadImageModal = new Modal('modal-upload-img');
const btnOpenUploadImageModal = document.querySelector('.open-modal-upload-image');
btnOpenUploadImageModal.addEventListener('click', () => uploadImageModal.open());

const settingsDialogMenu = new DropdownMenu('#setting-dialog-menu');
const btnSettingDialog = document.querySelector('.setting-dialog');
btnSettingDialog.addEventListener('click', (event) => {
    btnSettingDialog.classList.toggle('setting-dialog_active');

    btnSettingDialog.classList.contains('setting-dialog_active')
        ? settingsDialogMenu.open(event)
        : settingsDialogMenu.close();
});
document.addEventListener('click', (event) => {
    if (event.target.matches('.setting-dialog')) return;

    btnSettingDialog.classList.remove('setting-dialog_active');
    settingsDialogMenu.close();
});

const attachedFileMenu = new DropdownMenu('#attached-menu');
const btnAttachedFile = document.querySelector('.add-attached-file');
btnAttachedFile.addEventListener('click', (event) => {
    btnAttachedFile.classList.toggle('add-attached-file_active');

    btnAttachedFile.classList.contains('add-attached-file_active')
        ? attachedFileMenu.open(event)
        : attachedFileMenu.close();
});
document.addEventListener('click', (event) => {
    if (event.target.matches('.add-attached-file')) return;

    btnAttachedFile.classList.remove('add-attached-file_active');
    attachedFileMenu.close();
});