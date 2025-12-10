import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n
  .use(initReactI18next)
  .init({
    debug: false,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
    resources: {
      en: {
        translation: {
          emptyFormField: 'This field is required.',
          invalidEmailForm: 'Not a valid e-Mail address.',
          checkboxFieldRequired: 'Select at least one options.',
          idCardForm: {
            invalidInput: 'Not a valid ID Card Number.',
            invalidLengthInput: 'Input must be {{maxChars}} characters.'
          },
          invalidURLForm: 'Not a valid URL.',
          phoneNumberForm: {
            label: 'Phone Number',
            countryCodePlaceholder: 'Country Code',
            phoneNumberFormHelper: 'Input {{label}} without country code.',
            emptyCountryCode: 'Country code cannot be empty.',
          },
          password: {
            passwordPlaceholder: 'Input password',
            confirmPasswordPlaceholder: 'Retype Password',
            passwordInvalid: 'Not a valid password!',
            errorcontainNumber: 'Must contain a number.',
            errorMinChars: 'Minimum 8 characters.',
            errorUppercase: 'Must contain an upper case letter.',
            errorLowercase: 'Must contain a lower case letter.',
            errorSpecialChars: 'Must contain a special character.',
            unmatchPasswordConfirmation: 'Password did not match!',
            emptyPassword: 'Password still empty!',
            emptyPasswordConfirmation: 'Password confirmation still empty!',
            strictPasswordError: 'Password must contain 8 characters'
          },
          dateTimePicker: {
            datePlaceholder: 'Select Date',
            startDatePlaceholder: 'Select Start Date',
            endDatePlaceholder: 'Select End Date',
            timePlaceholder: 'Select Time',
            startTimePlaceholder: 'Select Time Start',
            endTimePlaceholder: 'Select Time End',
            weekPlaceholder: 'Select Week',
            startWeekPlaceholder: 'Select Week Start',
            endWeekPlaceholder: 'Select Week End',
            monthPlaceholder: 'Select Month',
            startMonthPlaceholder: 'Select Month Start',
            endMonthPlaceholder: 'Select Month End',
            quarterPlaceholder: 'Select Quarter',
            startQuarterPlaceholder: 'Select Quarter Start',
            endQuarterPlaceholder: 'Select Quarter End',
            yearPlaceholder: 'Select Year',
            startYearPlaceholder: 'Select Year Start',
            endYearPlaceholder: 'Select Year End',
          },
          uploader: {
            errorFormRequired: 'One or more image(s) or file(s) are required',
            errorFormValues: 'Error image(s) or file(s) must be removed',
            uploadSingleText: `Click or drag single {{fileType}} file to this area to upload`,
            uploadMultipleText: `Click or drag single or multiple {{fileType}} file to this area to upload`,
            fileFormatHint: 'Only support {{allowedFileFormatText}} file format.',
            fileSizeHintText: 'Maximum {{maxFileSize}} MB file size.',
            uploadSuccess: 'File uploaded successfully',
            uploadFailed: 'Error uploading the file',
            deleteSuccess: 'File deleted successfully.',
            deleteFailed: 'Failed to delete file.',
            errorFileSize: 'file exceeds {{maxFileSize}}MB',
            errorFileFormat: 'not supported file format',
            undetectedFormatFile: 'file format not detected',
            errorUploadHint: 'The file exceeds {{maxFileSize}}MB or is not a supported file format.'
          },
        }
      },
      id: {
        translation: {
          emptyFormField: 'Kolom ini wajib diisi.',
          invalidEmailForm: 'Alamat email tidak valid.',
          checkboxFieldRequired: 'Pilih setidaknya satu opsi.',
          idCardForm: {
            invalidInput: 'Nomor kartu identitas tidak valid.',
            invalidLengthInput: 'Input harus {{maxChars}} karakter.'
          },
          invalidURLForm: 'URL tidak valid.',
          phoneNumberForm: {
            label: 'Nomor Telepon',
            countryCodePlaceholder: 'Kode Negara',
            phoneNumberFormHelper: 'Masukkan {{label}} tanpa kode negara.',
            emptyCountryCode: 'Kode negara tidak boleh kosong.',
          },
          password: {
            passwordPlaceholder: 'Masukkan Password',
            confirmPasswordPlaceholder: 'Ketik Ulang Password',
            passwordInvalid: 'Password tidak valid!',
            errorcontainNumber: 'Harus ada angka.',
            errorMinChars: 'Minimum 8 karakter.',
            errorUppercase: 'Harus ada huruf kapital.',
            errorLowercase: 'Harus ada huruf kecil.',
            errorSpecialChars: 'Wajib ada spesial karakter.',
            unmatchPasswordConfirmation: 'Password tidak sama!',
            emptyPassword: 'Password masih kosong!',
            emptyPasswordConfirmation: 'Konfirmasi password masih kosong!',
            strictPasswordError: 'Password wajib 8 karakter'
          },
          dateTimePicker: {
            datePlaceholder: 'Pilih Tanggal',
            startDatePlaceholder: 'Pilih Tanggal Awal',
            endDatePlaceholder: 'Pilih Tanggal Akhir',
            timePlaceholder: 'Pilih Jam',
            startTimePlaceholder: 'Pilih Jam Awal',
            endTimePlaceholder: 'Pilih Jam Akhir',
            weekPlaceholder: 'Pilih Minggu',
            startWeekPlaceholder: 'Pilih Minggu Awal',
            endWeekPlaceholder: 'Pilih Minggu Akhir',
            monthPlaceholder: 'Pilih Bulan',
            startMonthPlaceholder: 'Pilih Bulan Awal',
            endMonthPlaceholder: 'Pilih Bulan Akhir',
            quarterPlaceholder: 'Pilih Triwulan',
            startQuarterPlaceholder: 'Pilih Triwulan Awal',
            endQuarterPlaceholder: 'Pilih Triwulan Akhir',
            yearPlaceholder: 'Pilih Tahun',
            startYearPlaceholder: 'Pilih Tahun Awal',
            endYearPlaceholder: 'Pilih Tahun Akhir',
          },
          uploader: {
            errorFormRequired: 'Satu atau lebih gambar atau berkas diperlukan',
            errorFormValues: 'Gambar atau berkas yang error wajib dihapus',
            uploadSingleText: 'Klik atau seret satu file {{fileType}} ke area ini untuk mengunggah',
            uploadMultipleText: 'Klik atau seret satu atau beberapa file {{fileType}} ke area ini untuk mengunggah',
            fileFormatHint: `Hanya mendukung format file {{allowedFileFormatText}}.`,
            fileSizeHintText: 'Ukuran file maksimum {{maxFileSize}} MB',
            uploadSuccess: 'Berhasil mengunggah file',
            uploadFailed: 'Gagal mengunggah file',
            deleteSuccess: 'Berhasil menghapus file',
            deleteFailed: 'Gagal menghapus file',
            errorFileSize: 'file melebihi {{maxFileSize}}MB',
            errorFileFormat: 'format file tidak didukung',
            undetectedFormatFile: 'format file tidak terdeteksi',
            errorUploadHint: 'Berkas melebihi {{maxFileSize}}MB atau bukan format file yang didukung.'
          },
        }
      }
    }
  });

export default i18n;