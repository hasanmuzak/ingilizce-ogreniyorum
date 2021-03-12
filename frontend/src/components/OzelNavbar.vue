<template>
  <div>
    <div class="my-navbar bg-gray-800 flex justify-end p-2">
      <v-btn class="ma-1" color="white" plain @click="dialog = true">
        <v-icon>mdi-plus</v-icon>
        Yeni Kelime
      </v-btn>
      <v-dialog v-model="dialog" width="800">
        <v-card>

          <v-card-title class=""> Yeni Kelime Ekle </v-card-title>
          <div class="p-4">
            <v-alert
            v-if="error === true"
            color="red"
            type="error"
          >Bu kelime zaten kayıtlı.
          </v-alert>
          <v-alert
            v-if="error === false"
            color="green"
            type="success"
          >Kelime başarıyla eklendi!
          </v-alert>
          </div>
          <v-card-text>
            <div class="flex items-center mt-4">
              <div class="input-span">
                <span class="text-gray-600 flex items-center">
                  <v-icon class="mr-3">mdi-pencil</v-icon>
                  Kelime
                </span>
              </div>
              <v-text-field
                @input="$v.kelime.$touch()"
                v-model="kelime"
                placeholder="Kelimeyi yazınız."
                outlined
                :rules="[$v.kelime.required, $v.kelime.minLength]"
              ></v-text-field>
            </div>
            <div class="flex items-center mt-4">
              <div class="input-span">
                <span class="text-gray-600 flex items-center">
                  <v-icon class="mr-3">mdi-filter-variant</v-icon>
                  Tür
                </span>
              </div>
              <v-select
                :items="items"
                @input="$v.tur.$touch()"
                v-model="tur"
                placeholder="Kelimeyi yazınız."
                outlined
                :rules="[$v.tur.required, $v.tur.minLength]"
              ></v-select>
            </div>
            <div class="flex items-center mt-6">
              <div class="input-span">
                <span class="text-gray-600 flex items-center">
                  <v-icon class="mr-3">mdi-account-voice</v-icon>
                  Telaffuz
                </span>
              </div>
              <v-text-field
                v-model="telaffuz"
                @input="$v.telaffuz.$touch()"
                placeholder="Kelimenin telaffuzu (vowel)."
                :rules="[$v.telaffuz.required, $v.telaffuz.minLength]"
                outlined
              ></v-text-field>
            </div>
            <div class="flex items-center mt-6">
              <div class="input-span">
                <span class="text-gray-600 flex items-center">
                  <v-icon class="mr-3">mdi-translate</v-icon>
                  Anlam
                </span>
              </div>
              <v-text-field
                v-model="anlam"
                @input="$v.anlam.$touch()"
                :rules="[$v.anlam.required, $v.anlam.minLength]"
                placeholder="Kelimenin Türkçe anlamı."
                outlined
              ></v-text-field>
            </div>
            <div class="flex items-center mt-6">
              <div class="input-span">
                <span class="text-gray-600 flex items-center">
                  <v-icon class="mr-3">mdi-google-translate</v-icon>
                  İngilizce Anlamı
                </span>
              </div>
              <v-text-field
                v-model="ingilizce_anlam"
                @input="$v.ingilizce_anlam.$touch()"
                :rules="[$v.ingilizce_anlam.required, $v.ingilizce_anlam.minLength]"
                placeholder="Kelimenin İngilizce anlamı."
                outlined
              ></v-text-field>
            </div>
            <div class="flex items-center mt-6">
              <div class="input-span">
                <span class="text-gray-600 flex items-center">
                  <v-icon class="mr-3">mdi-book-open-outline</v-icon>
                  Eş Anlamı
                </span>
              </div>
              <v-text-field
                v-model="es_anlam"
                @input="$v.es_anlam.$touch()"
                :rules="[$v.es_anlam.required, $v.es_anlam.minLength]"
                placeholder="Kelimenin eş anlamı."
                outlined
              ></v-text-field>
            </div>
            <div class="flex items-center mt-6">
              <div class="input-span">
                <span class="text-gray-600 flex items-center">
                  <v-icon class="mr-3">mdi-head-question-outline</v-icon>
                  Örnek Cümle
                </span>
              </div>
              <v-text-field
                v-model="ornek_cumle1"
                @input="$v.ornek_cumle1.$touch()"
                :rules="[$v.ornek_cumle1.required, $v.ornek_cumle1.minLength]"
                placeholder="Kelimeyi içeren örnek bir cümle."
                outlined
              ></v-text-field>
            </div>
            <div class="flex items-center mt-6">
              <div class="input-span">
                <span class="text-gray-600 flex items-center">
                  <v-icon class="mr-3">mdi-head-question-outline</v-icon>
                  Örnek Cümle
                </span>
              </div>
              <v-text-field
                v-model="ornek_cumle2"
                :rules="[$v.ornek_cumle2.required, $v.ornek_cumle2.minLength]"
                @input="$v.ornek_cumle2.$touch()"
                placeholder="Kelimeyi içeren başka bir örnek cümle."
                outlined
              ></v-text-field>
            </div>
            <div class="flex items-center mt-6">
              <div class="input-span">
                <span class="text-gray-600 flex items-center">
                  <v-icon class="mr-3">mdi-code-braces</v-icon>
                  İngiliz URL
                </span>
              </div>
              <v-text-field
                v-model="ingiliz_telaffuz"
                :rules="[$v.ingiliz_telaffuz.required, $v.ingiliz_telaffuz.minLength]"
                @input="$v.ingiliz_telaffuz.$touch()"
                placeholder="Kelimenin İngiliz aksanı."
                outlined
              ></v-text-field>
            </div>
            <div class="flex items-center mt-6">
              <div class="input-span">
                <span class="text-gray-600 flex items-center">
                  <v-icon class="mr-3">mdi-code-braces</v-icon>
                  Amerikan URL
                </span>
              </div>
              <v-text-field
                v-model="amerikan_telaffuz"
                :rules="[$v.amerikan_telaffuz.required, $v.amerikan_telaffuz.minLength]"
                @input="$v.amerikan_telaffuz.$touch()"
                placeholder="Kelimenin Amerikan aksanı."
                outlined
              ></v-text-field>
            </div>
          </v-card-text>

          <v-divider></v-divider>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn :disabled="$v.$invalid" :loading="loading" color="primary" @click="kaydet()">
              <v-icon left>mdi-plus</v-icon>
              Kaydet
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import {required, minLength} from 'vuelidate/lib/validators';

export default {
  data() {
    return {
      error : null,
      loading : null,
      dialog: false,
      tur : "",
      kelime: "",
      telaffuz: "",
      anlam: "",
      ingilizce_anlam: "",
      es_anlam: "",
      ornek_cumle1: "",
      ornek_cumle2: "",
      ingiliz_telaffuz : '',
      amerikan_telaffuz : '',
      items: ['Isim (Noun)', 'Sıfat (Adjective)', 'Zarf (Adverb)', 'Fiil (Verb)'],
    };
  },
  methods: {
    kaydet() {
      this.loading = true
      axios
        .post("ekle", {
          kelime: this.kelime,
          telaffuz: this.telaffuz,
          turkce_anlam: this.anlam,
          ingilizce_anlam: this.ingilizce_anlam,
          es_anlam: this.es_anlam,
          ornek_cumle1: this.ornek_cumle1,
          ornek_cumle2: this.ornek_cumle2,
          ingiliz_telaffuz : this.ingiliz_telaffuz,
          amerikan_telaffuz : this.amerikan_telaffuz,
          tur : this.tur
        })
        .then((data) => {
          console.log(data.response);
          this.error = false
          this.loading = false
        })
        .catch((err) => {
          if(err.response.status === 503){
            this.error = true
            this.loading = false
          }
        });
    },
  },
  validations : {
    kelime : {
      required,
      minLength : minLength(2)
    },
    telaffuz : {
      required,
      minLength : minLength(2)
    },
    anlam : {
      required,
      minLength : minLength(3)
    },
    ingilizce_anlam : {
      required,
      minLength : minLength(8)
    },
    es_anlam : {
      required,
      minLength : minLength(2)
    },
    ornek_cumle1 : {
      required,
      minLength : minLength(10)
    },
    ornek_cumle2 : {
      required,
      minLength : minLength(10)
    },

    ingiliz_telaffuz : {
      required,
      minLength : minLength(10)
    },
    amerikan_telaffuz : {
      required,
      minLength : minLength(10)
    },
    tur : {
      required,
      minLength : minLength(3)
    }

  }
};
</script>

<style>
.v-btn__content {
  color: white !important;
}
.input-span {
  width: 180px;
}
.v-select__selections{
  padding: 0 !important;
}
.v-input__slot {
  margin-bottom: 0;
  min-height: 40px !important;
}
.v-text-field__details {
  display: none;
}
.v-text-field--full-width .v-input__prepend-outer, .v-text-field--full-width .v-input__prepend-inner, .v-text-field--full-width .v-input__append-inner, .v-text-field--full-width .v-input__append-outer, .v-text-field--enclosed .v-input__prepend-outer, .v-text-field--enclosed .v-input__prepend-inner, .v-text-field--enclosed .v-input__append-inner, .v-text-field--enclosed .v-input__append-outer{
  margin-top: 5px !important;
}
</style>
