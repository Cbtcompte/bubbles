import toastr from 'toastr'

toastr.options = {
    "closeButton": true,
    "newestOnTop": false,
    "progressBar": true,
    "positionClass": "toast-top-right",
    "preventDuplicates": false,
    "onclick": null,
    "showDuration": "300",
    "hideDuration": "1000",
    "timeOut": "5000",
    "extendedTimeOut": "1000",
    "showEasing": "swing",
    "hideEasing": "linear",
    "showMethod": "fadeIn",
    "hideMethod": "fadeOut"
}


export const toastSuccess = (message) =>  {
    toastr.success(message)
}

export const toastDanger = (message) =>  {
    toastr.danger(message)
}

export const toastWarning = (message) =>  {
    toastr.warning(message)
}
