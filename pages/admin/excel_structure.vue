<template>
    <div class="bg-grey-darken-4">
        <v-sheet elevation="24" color="grey-darken-3">
            <v-container>
                <v-alert type="info" variant="tonal">
                    Structura fisierului excel consta din urmatoarele:
                        <ol>
                            <li v-for="item in excelStructure"
                            :key="item.column_name">
                                <p class="0 m-2">
                                   {{ item.text }}
                                </p>
                            </li>
                        </ol>
                </v-alert>
            </v-container>
            <v-container>
                <v-alert type="info" variant="tonal">
                    Cazul de updatare
                        <ol>
                            <li v-for="item in excelStructureUpdate"
                            :key="item.column_name">
                                <p class="0 m-2">
                                   {{ item.text }}
                                </p>
                            </li>
                        </ol>
                </v-alert>
            </v-container>
            <v-container class="text-center">
                <v-alert type="error" v-if="showErrorFileDwonload">
                    Eroare la downloadarea fisierului excel
                </v-alert>
                <p>Exemplu de fisier excel</p>
                <p><v-icon>mdi-arrow-down</v-icon></p>
                <v-btn color="success" variant="flat" @click="downloadExcel">
                    EXEMPLU FISIER EXCEL 
                    <v-icon>
                        mdi-download
                    </v-icon>
                </v-btn>
            </v-container>
            <v-container>
                <v-alert type="warning" >
                <p class="font-weight-bold h3 text-black">PROCEDATI CU GRIJA, CITITI REGULILE CU ATENTIE SI DATI UN MESAJ IN CAZ DE VREO NELAMURIRE!</p>
                </v-alert>
            </v-container>
        </v-sheet>
    </div>
</template>


<script setup>
import adminService from '~/services/Admin'
definePageMeta({
    layout: 'admin',
    middleware: 'admin'
})

const showErrorFileDwonload = ref(false)

function fireAlarm(response){
    response.value = true;
    setTimeout(() => {
        response.value = false;
    }, 1500);
}

const excelStructureUpdate = [
    {
        column_name: 'info',
        text: ' Primul rand va fi ignorat automat la updatare.Acesta consta din tipul coloanelor'
    },
    {
        column_name: 'info2',
        text: ' Daca programul detecteaza acelasi cod deja stocat in baza de date , doar ii va modifica atributele.'

    },
    {
        column_name: 'info3',
        text: ' Aceleasi reguli se aplica la updatare ca la creeare.'
        
    },
    {
        column_name: 'info4',
        text: 'La partea de imagini, regulile ramani aceleasi , doar ca: programul va cauta un fisier in fisierul "imagini_import" care este pe DESKTOP' +
        ' care se numeste "imagini_update". Acolo vor fi toate imaginile care sa fie introduse in loc de cele vechi. Acesta le va inlocui automat!'
        
    },
    
]

const excelStructure = [
    {
        column_name: 'info',
        text: ' Primul rand va fi ignorat automat.Acesta consta din tipul coloanelor'
    },
    {
        column_name: 'codProdus',
        text: 'Pe prima coloana se afla codul produsului(ex. Aylin , Denkins , etc).Litere vor fi transformate in litere de tipar.' +
        'Este obligatoriu si neaparat unic!'
    },
    {
        column_name: 'Descriere',
        text: 'Pe a doua coloana se afla descriere produsului curent.Aceasta trebuie sa fie in maxim 150 de caractere.' +
        'Nu este obligatorie! Daca produsului nu are descriere lasati caracterul -'
    },
    {
        column_name: 'Numele produsului',
        text: 'Pe a treia coloana se afla numele produsului curent. Acesta trebuie sa fie in maxim 50 de caractere.' +
        'Este obligatoriu si nu neaparat unic!'
    },
    {
        column_name: 'Compozitia produsului',
        text: 'Pe a patra coloana se afla compozitia produsului curent. Acesta trebuie sa fie in maxim 50 de caractere.' +
        'Nu este obligatorie! Daca produsului nu are o compozitie , lasat caracterul -'
    },
    {
        column_name: 'Pretul produsului',
        text: 'Pe a  coloana 5 se afla pretul produsului curent. Poate fi un numar decimal , cu virgula.' +
        'Am lasat posibilitatea de a nu fi obligatoriu.ATENTIE! Daca produsul are preturi diferite pe dimensiuni diferite, '
        + 'Atunci in functie de dimensiunile produsului , preturile ar trebuie puse cu virgula (ex. 300,350,400,450) in conformitate' +
        'cu dimensiunile aferente (ex. 140x160,140x180,140x200 ,140x170). IMPORTANT! Numarul de preturi , trebuie sa fie egal cu numarul de dimensiuni,' +
        'Daca nu sunt egale , programul va afisa o eroare!. DACA INTRODUCETI O PERDEA/DRAPERIE , lasati la "-". DACA PRODUSUL NU ARE DIMENSIUNI DIFERITE , LASATI LA "-" si are doar o dimensiune. introduceti pretul , dimensiunea , si recomandare de pat aferenta .'
    },
    {
        column_name: 'TVA',
        text: 'Pe  coloana 6 se afla TVA-ul . De regula la 20 lasat , fara simbolul (%)'
    },
    {
        column_name: 'Ingrijirea',
        text: 'Pe coloana 7 se afla Ingrijirea produsului. Nu este obligatorie si daca nu are poate fi lasata cu simbolul -'
    },
    {
        column_name: 'Greutatea',
        text: 'Pe  coloana 8 se afla Greutatea produsului.Un numar decimal , cu virgula (ex. 2.1 , 2.5) in KG .Nu este obligatorie si daca nu are poate fi lasata cu simbolul -'
    },
    {
        column_name: 'Fata reversibila',
        text: 'Pe coloana 0 se afla posibilatea de fata reversibila a  produsului.Daca produsul are fata reversibila lasati TRUE , daca nu , lasati FALSE.'
    },
    {
        column_name: 'Stoc',
        text: 'Pe coloana 10 se afla stocul  produsului.Daca produsul este la comanda , lasati cu caracterul "-"'
    },
    {
        column_name: 'Nume producator',
        text: 'Pe coloana 11 se afla producatorul produsului.Daca produsul are un producator , puneti numele acestuia, in maxim 30 de caractere.Daca produsul nu are un producator, lasati cu caracterul "-"'
    },
    {
        column_name: 'Dimensiuni',
        text: 'Pe coloana 12 se afla dimensiunile produsului.Daca produsul nu are dimensiuni si nu are un pret pe dimensiuni , lasati caracterul "-"' +
        'Aceasta coloana are legatura cu coloana de pret (TREBUIE SA FIE DE ACCEASI DIMENSIUNE, 4 preturi , 4 dimensiuni). Daca nu sunt egale , acesta va arunca o eroare.' +
        'Formatul in care trebuie sa aveti dimensiunile in coloana (LUNGIMExLATIME, ex. 200x90 , 200x160).DACA INTRODUCETI O PERDEA/DRAPERIE , lasati la "-".'
    },
    {
        column_name: 'Recomandare pat',
        text: 'Pe coloana 13 se afla recomandarile de pat ale produsului.Daca produsul nu are nicio dimensiune si nu are nicio recomandare de pat , lasati caracterul "-"' +
        'Daca produsul are dimensiuni , atunci numarul de dimensiuni per produs TREBUIE sa fie acelasi cu NUMARUL de RECOMANDARI DE PAT! Daca nu sunt, ' +
        'Programul va afisa o eroare si importul nu se va realiza!' +
        'Formatul in care trebuie sa aveti recomandarile in coloana (LUNGIMExLATIME, ex. 200x90 , 200x160). DACA INTRODUCETI O PERDEA/DRAPERIE , lasati la "-".'
    },
    {
        column_name: 'Cod culori',
        text: 'Pe coloana 14 se afla culori si codurile de culori.Aceasta este OBLIGATORIE!.' +
        'Acestea se vor scrie in formatul (Numele culorii-codul culorii) -> EXEMPLU: Grey blue-05,alpin-green-04.' +
        'Acestea vor fi separate prin caracterul ",".Daca coloana este goala , programul va afisa o eroare si importul nu se va realiza.'

    },
    {
        column_name: 'Categorii',
        text: 'Pe coloana 15 se afla categoriile produsului. Acestea vor fi separate printr-o virgula(",").' +
        'Coloana este obligatorie si va fi in formatul urmator: EXEMPLU: Copii,Bucatarie,Premium '
        
    },
    {
        column_name: 'Tipul produsului',
        text: 'Pe coloana 16 se afla tipul produsului. Acesta este OBLIGATORIU! Exemplu: Cuvertura, Perna ' +
        'Perdelele/draperiile au o sectiune diferita. Vezi partea de MATERIALE/INELE PRINDERE/TIPURI LINIE/TIPURI CUSATURA'
        
    },
    {
        column_name: 'Pretul la metru',
        text: 'Pe coloana 17 se afla pretul la metru. Acesta este OBLIGATORIE daca adaugati un material!(Nu accepta zecimale)' +
        'Daca detecteaza ca tipul produsului este "perdea"/"draperie" , programul va lua in considerare coloana.'
        
    },
    {
        column_name: 'Numele materialului',
        text: 'Pe coloana 18 se afla numele materialului(sau numele perdelei/draperiei). Acesta este OBLIGATORIE daca adaugati un material!' +
        'Daca detecteaza ca tipul produsului este "perdea"/"draperie" , programul va lua in considerare coloana.'
        
    },
    
    {
        column_name: 'Imaginile produsului',
        text: 'Pe coloana a 19 se afla imaginile produsului. Aceasta NU  este OBLIGATORIE! ' +
        ' Daca nu aveti imagini la momentul curent pentru produse , lasati caracterul "-". Daca aveti imagini,' +
        'programul a fost realizat intr-un mod incat: Cauta pe DESKTOP un fisier numit "imagini_import" , unde ' +
        'trebuie sa aveti imaginile pe care vreti sa le importati. In coloana excelului , veti trece numele imaginilor la produsul curent,' + 
        'separate printr-o virgula(","). DE ASEMENEA , numele imaginii este de asemenea foarte important. Structura numelui ar trebuie sa fie:  ' +
        '"AYLIN_X03_CUVERTURA.jpg" , daca produsul nu are fata reversibila, iar daca are "AILYN_X03_REV_CUVERTURA.jpg". ' +
        ' Ceea ce este cel mai relevant este separarea codului de culoare in formatul "X(codul de culoare) EX: X03,X04,X07".' +
        ' Daca programul nu va detecta formatul "_X(CODUL DE CULOARE)_" , acesta va afisa o eroare si importul nu se va realiza!' +
        'DE ASEMENEA, puteti lasa "-" la Imagini , si un nume de fisier la numele fisierului.Programul va rula.'
        
    },
    {
        column_name: 'Fisierele de stocare ale imaginilor produsului',
        text: 'Pe coloana 20, se afla numele fisierul de stocare a imaginilor. Acesta nu poate fi gol,' +
        'Aici este o lista cu fisiere disponibile: fata_reversibila.'
    },
    {
        column_name: 'Pret de baza al produsului',
        text: 'Pe coloana 21, se afla pretul de baza al produsului. Acesta nu este obligatoriu si poate fi lasat cu caracterul "-".' +
        'Acesta va fi luat in considerare doar daca produsul nu are dimensiuni cu preturi diferite pe dimensiuni.' +
        'Daca produsul are si un pret de baza si dimensiuni diferite , prioritatea de afisarea o vor avea variatiile de dimensiuni cu preturi diferite.' +
        'Diferite erori care pot aparea vor fi afisate dupa rularea PROGRAMULUI!' 
    },
   

]


const downloadExcel = async () => {
    try {
        // Call the admin service to get the file
       
        const response =  await adminService.downloadExcel();
        
        // Convert the response into a Blob (binary large object)
        const blob = new Blob([response], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });

        // Create a URL for the blob object
        const url = window.URL.createObjectURL(blob);

        // Create an anchor element and set the href to the blob URL
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'exemplu_fisier.xlsx'); // Set the desired file name

        // Programmatically click the anchor to trigger the download
        document.body.appendChild(link);
        link.click();

        // Clean up by removing the anchor and revoking the object URL
        link.remove();
        window.URL.revokeObjectURL(url);
    } catch (error) {
        fireAlarm(showErrorFileDwonload);
        console.error("Error downloading Excel file:", error);
    }
}

</script>