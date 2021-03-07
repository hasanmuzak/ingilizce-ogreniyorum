<template>
  <div>
    <div class="md:container mx-auto">
      <h3 class="font-semibold text-gray-600 text-lg flex items-center"><v-icon class="mr-2">mdi-subdirectory-arrow-right</v-icon>İngilizce Kelimeler</h3>
    </div>
    <div class="md:container mx-auto mt-4 border bg-white transition duration-300 hover:shadow-lg">
      <v-data-table
        :headers="kelime_basliklari"
        :items="kelimeler"
        single-expand
        show-expand
        item-key="name"
        class="elevation-1"
        hide-default-footer
        @click:row="(item, slot) => slot.expand(!slot.isExpanded)"
      >
        <template v-slot:expanded-item="{ headers, item }">
          <td :colspan="headers.length">
            <div
              class="w-full h-full bg-blue-200 transition duration-300 hover:bg-blue-300 p-3"
            >
              Ornek {{ item.kelime }}
            </div>
          </td>
        </template>

        <template v-slot:[`item.kelime`]="{ item }">
          <span class="font-semibold">
            {{ item.kelime }}
          </span>
        </template>
        <template v-slot:[`item.telaffuz`]="{ item }">
          <span class="font-semibold">
            {{ item.telaffuz }}
          </span>
        </template>
        <template v-slot:[`item.turkce_anlam`]="{ item }">
          <span class="font-semibold">
            {{ item.turkce_anlam }}
          </span>
        </template>
        <template v-slot:[`item.ingilizce_anlam`]="{ item }">
          <span class="font-semibold">
            {{ item.ingilizce_anlam }}
          </span>
        </template>
        <template v-slot:[`item.es_anlam`]="{ item }">
          <span class="font-semibold">
            {{ item.es_anlam }}
          </span>
        </template>
        <template v-slot:[`item.date`]="{ item }">
          <span class="font-semibold p-2 rounded" :class="hesapla(item.date)">
            {{ item.date }}
          </span>
        </template>
      </v-data-table>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  data() {
    return {
      expanded: [],
      singleExpand: false,
      kelime_basliklari: [
        {
          text: "Kelime",
          align: "start",
          sortable: true,
          value: "kelime",
        },
        { text: "Telaffuz", value: "telaffuz", sortable: false },
        { text: "Anlam", value: "turkce_anlam", sortable: false },
        { text: "İngilizce Anlam", value: "ingilizce_anlam", sortable: false },
        { text: "Eş Anlam", value: "es_anlam", sortable: false },
        { text: "Tarih", value: "date", sortable: true },
      ],
      kelimeler: [],
    };
  },
  methods: {
    fetchWords () {
      axios.get('').then(response => {
        this.kelimeler = response.data;
        this.kelimeler.forEach(element => {
          var tarih = new Date(element.date)
          element.date = tarih.toLocaleDateString('en-GB');
        })
      }).catch(err => {
        console.log(err);
      })
    },
    hesapla(stringDate){
      var tarih_bolunuk = stringDate.split("/");
      var yeni_tarih = new Date(tarih_bolunuk[2], tarih_bolunuk[1]-1, tarih_bolunuk[0]);
      var suanki_tarih = new Date(Date.now()).toLocaleDateString("en-GB").split("/")
      var suanki_yeni_tarih = new Date(suanki_tarih[2], suanki_tarih[1]-1, suanki_tarih[0]);
      
      if(+yeni_tarih === +suanki_yeni_tarih){
        return 'text-green-800 bg-green-200'
      }
      return 'text-red-800 bg-red-200'
      
    }
  },
  created () {
    this.fetchWords();
  }
};
</script>

<style>
table {
  font-family: "Titillium Web", sans-serif;
}

.v-data-table-header tr th {
  font-size: 16px !important;
}

.v-data-table-header tr {
}
.v-data-table__expanded__content > td {
  height: auto !important;
  padding: 0 !important;
}
</style>
