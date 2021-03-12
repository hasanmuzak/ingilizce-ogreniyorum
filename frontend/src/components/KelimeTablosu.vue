<template>
  <div class="p-4">
    <div class="pt-12">
      <h3 style="font-family: 'Source Sans Pro', sans-serif;" class="font-semibold text-gray-600 text-lg flex items-center"><v-icon class="mr-2">mdi-subdirectory-arrow-right</v-icon>İngilizce Kelimeler</h3>
    </div>
    <div class="mt-4 border bg-white transition duration-300 hover:shadow-lg">
      <v-data-table
        :headers="kelime_basliklari"
        :items="kelimeler"
        single-expand
        show-expand
        item-key="kelime"
        class="elevation-1"
        hide-default-footer
        
      >
        <template v-slot:expanded-item="{ headers, item }">
          <td :colspan="headers.length">
            <div
              class="w-full h-full  px-2 pt-3"
            >
            <h3 class="ml-2 font-semibold mb-4 text-blue-600" style="font-size:16px">Örnek Cümleler :</h3>
            <div class="flex items-center">
              <v-icon color="blue">mdi-arrow-right</v-icon> <p class="transition duration-300 mb-1 hover:bg-gray-200  hover:text-gray-800 rounded py-2 text-gray-600 ml-2 px-2 tracking-wide buyuk-kelime" style="font-size:16px">{{item.ornek_cumle1}} </p>
            </div>
             <div class="flex items-center">
               <v-icon color="blue">mdi-arrow-right</v-icon><p class="transition duration-300 mb-2 hover:bg-gray-200 hover:text-gray-800 rounded py-2 text-gray-600 ml-2 px-2 tracking-wide buyuk-kelime" style="font-size:16px">{{item.ornek_cumle2}}</p>
             </div>
            </div>
          </td>
        </template>

        <template v-slot:[`item.kelime`]="{ item }">
          <span class="font-semibold capitalize text-lg text-gray-600">
            {{ item.kelime }}
          </span>
        </template>
        <template v-slot:[`item.telaffuz`]="{ item }">
          <span style="font-size:16px;" class=" capitalize text-white bg-gray-800 rounded p-2">
            {{ item.telaffuz }}
          </span>
        </template>
        <template v-slot:[`item.turkce_anlam`]="{ item }">
          <span v-for="(kelime,index) in item.turkce_anlam" :key="index" style="font-size:16px" class=" capitalize text-blue-600  p-2 transition duration-300 hover:bg-blue-200 rounded mr-2">
            {{ kelime }}
          </span>
        </template>
        <template v-slot:[`item.ingilizce_anlam`]="{ item }">
          <span v-for="(kelime,index) in item.ingilizce_anlam" :key="index" class="tracking-wide transition duration-300 hover:bg-gray-300  capitalize text-gray-800  py-3 px-2 bg-gray-200 rounded mr-2">
            {{ kelime }}
          </span>
        </template>
        <template v-slot:[`item.es_anlam`]="{ item }">
          <span style="font-size:16px" class="font-semibold capitalize text-gray-600">
            {{ item.es_anlam }}
          </span>
        </template>
        <template v-slot:[`item.date`]="{ item }">
          <span class="font-semibold p-2 rounded" :class="hesapla(item.date)">
            {{ item.date }}
          </span>
        </template>
        <template v-slot:[`item.actions`]="{ item }">
            <div @click="playBritish(item)" title="İngiliz Aksanı" class="inline-block p-2 text-red-500 transition duration-300 hover:bg-red-600 rounded hover:text-white mr-2">
              <i class="fas fa-volume-up"></i>
              <audio :id="'br'+item._id" class="hidden">
                <source :src="item.ingiliz_telaffuz" type="audio/mpeg">
              </audio>
            </div>
            <div @click="playAmerican(item)" title="Amerikan Aksanı" class="inline-block p-2 text-blue-500 transition duration-300 hover:bg-blue-800 rounded hover:text-white">
              <i class="fas fa-volume-up "></i>
               <audio :id="'us'+item._id" class="hidden">
                <source :src="item.amerikan_telaffuz" type="audio/mpeg">
              </audio>
            </div>
          <span class="hidden">{{item}}</span>
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
        { text: 'Dinle', value: 'actions', sortable: false },
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
          element.turkce_anlam = element.turkce_anlam.split(',')
          element.ingilizce_anlam = element.ingilizce_anlam.split(',')
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
      
    },

    playBritish(item){
      document.getElementById('br'+item._id).play()
    },
    playAmerican(item){
      document.getElementById('us'+item._id).play()
    }
  },
  created () {
    this.fetchWords();
  }
};
</script>

<style>
table {
      font-family: 'Source Sans Pro', sans-serif;
}
p{
  margin: 0 !important;
}
.v-data-table-header tr th {
  font-size: 16px !important;
}

.v-data-table-header tr {
  height: 50px;
}
tbody tr:not(.v-data-table__expanded__content){
  height: 60px;
  cursor: pointer;
}
tbody tr:not(.v-data-table__expanded__content):hover{
  background-color: rgb(248, 248, 248) !important;
}
.v-data-table__expanded__content > td {
  height: auto !important;
  padding: 0 !important;
}

.buyuk-kelime::first-letter{
  text-transform: capitalize;
}
</style>
