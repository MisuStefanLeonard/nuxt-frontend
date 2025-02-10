<template>
    <div class="bg-grey-darken-4">
        <v-sheet elevation="24" color="grey-darken-3">
            <v-container>
                <v-alert type="info" variant="tonal">
                    Structura fisierului excel consta din urmatoarele:
                        <v-list class="my-2 bg-grey-darken-4">
                            <v-list-item>
                                <span class="font-weight-normal h6"><v-icon>mdi-star-four-points-small</v-icon>Primul rand va fi ignorat automat.Acesta consta din tipul coloanelor</span>
                            </v-list-item>
                        </v-list>
                        <v-list class="my-2 bg-grey-darken-4">
                            <v-list-item>
                                <span class="font-weight-normal h6"><v-icon>mdi-star-four-points-small</v-icon>Pe prima coloana se afla codul produsului(ex. Aylin , Denkins , etc).Litere vor fi transformate in litere de tipar.' +
                                'Este obligatoriu si neaparat unic!</span>
                            </v-list-item>
                        </v-list>
                        <v-list class="my-2 bg-grey-darken-4">
                            <v-list-item>
                                <span class="font-weight-normal h6"><v-icon>mdi-star-four-points-small</v-icon>Pe a doua coloana se afla descriere produsului curent.Aceasta trebuie sa fie in maxim 150 de caractere.' +
        Nu este obligatorie! Daca produsului nu are descriere lasati caracterul -</span>
                            </v-list-item>
                        </v-list>
                        <v-list class="my-2 bg-grey-darken-4">
                            <v-list-item>
                                <span class="font-weight-normal h6"><v-icon>mdi-star-four-points-small</v-icon>Pe a treia coloana se afla numele produsului curent. Acesta trebuie sa fie in maxim 50 de caractere.' +
        Este obligatoriu si nu neaparat unic!</span>
                            </v-list-item>
                        </v-list>
                        <v-list class="my-2 bg-grey-darken-4">
                            <v-list-item>
                                <span class="font-weight-normal h6"><v-icon>mdi-star-four-points-small</v-icon>Pe a patra coloana se afla compozitia produsului curent. Acesta trebuie sa fie in maxim 50 de caractere.' +
        Nu este obligatorie! Daca produsului nu are o compozitie , lasat caracterul -</span>
                            </v-list-item>
                        </v-list>
                        <v-list class="my-2 bg-grey-darken-4">
                            <v-list-item>
                                <span class="font-weight-normal h6"><v-icon>mdi-star-four-points-small</v-icon>Pe a  coloana 5 se afla pretul produsului curent. </span>
                                     <v-list class="m-2 bg-grey-darken-1">
                                        <v-list-item>
                                            <span class="font-weight-normal h6" ><v-icon>mdi-arrow-right</v-icon>Poate fi un numar decimal , cu virgula.</span>
                                        </v-list-item>
                                        <v-list-item>
                                            <span class="font-weight-normal h6" ><v-icon>mdi-arrow-right</v-icon>Am lasat posibilitatea de a nu fi obligatoriu.</span>
                                        </v-list-item>
                                        <v-list-item>
                                            <span class="font-weight-normal h6" ><v-icon>mdi-arrow-right</v-icon>ATENTIE! Daca produsul are preturi diferite pe dimensiuni diferite, atunci in functie de dimensiunile produsului , preturile ar trebuie puse cu virgula (ex. 300,350,400,450) 
                                                in conformitate cu dimensiunile aferente (ex. 140x160,140x180,140x200 ,140x170). </span>
                                        </v-list-item>
                                        <v-list-item>
                                            <span class="font-weight-normal h6" ><v-icon>mdi-arrow-right</v-icon>IMPORTANT! Numarul de preturi , trebuie sa fie egal cu numarul de dimensiuni. Daca nu sunt egale , programul va afisa o eroare!.</span>
                                        </v-list-item>
                                        <v-list-item>
                                            <span class="font-weight-normal h6" ><v-icon>mdi-arrow-right</v-icon>DACA INTRODUCETI O PERDEA/DRAPERIE , lasati la "-". </span>
                                        </v-list-item>
                                        <v-list-item>
                                            <span class="font-weight-normal h6" ><v-icon>mdi-arrow-right</v-icon> DACA PRODUSUL NU ARE DIMENSIUNI DIFERITE , LASATI LA "-" si are doar o dimensiune. introduceti pretul , dimensiunea , si recomandare de pat aferenta .</span>
                                        </v-list-item>
                                     </v-list>
                            </v-list-item>
                        </v-list>
                        <v-list class="my-2 bg-grey-darken-4">
                            <v-list-item>
                                <span class="font-weight-normal h6"><v-icon>mdi-star-four-points-small</v-icon>Pe  coloana 6 se afla TVA-ul . De regula la 20 lasat , fara simbolul (%)</span>
                            </v-list-item>
                        </v-list>
                        <v-list class="my-2 bg-grey-darken-4">
                            <v-list-item>
                                <span class="font-weight-normal h6"><v-icon>mdi-star-four-points-small</v-icon>Pe coloana 7 se afla Ingrijirea produsului. Nu este obligatorie si daca nu are poate fi lasata cu simbolul -</span>
                            </v-list-item>
                        </v-list>
                        <!-- <v-list>
                            <v-list-item>
                                <span class="font-weight-normal h6"><v-icon>mdi-star-four-points-small</v-icon>Pe  coloana 8 se afla Greutatea produsului.Un numar decimal , cu virgula (ex. 2.1 , 2.5) in KG .Nu este obligatorie si daca nu are poate fi lasata cu simbolul -</span>
                            </v-list-item>
                        </v-list> -->
                        <v-list class="my-2 bg-grey-darken-4">
                            <v-list-item>
                                <span class="font-weight-normal h6"><v-icon>mdi-star-four-points-small</v-icon>Pe coloana 8 se afla posibilatea de fata reversibila a  produsului. Daca produsul are fata reversibila lasati TRUE , daca nu , lasati FALSE.</span>
                            </v-list-item>
                        </v-list>
                        <v-list class="my-2 bg-grey-darken-4">
                            <v-list-item>
                                <span class="font-weight-normal h6"><v-icon>mdi-star-four-points-small</v-icon>Pe coloana 9 se afla stocul  produsului.Daca produsul este la comanda , lasati cu caracterul "-"</span>
                            </v-list-item>
                        </v-list>
                        <v-list class="my-2 bg-grey-darken-4">
                            <v-list-item>
                                <span class="font-weight-normal h6"><v-icon>mdi-star-four-points-small</v-icon>Pe coloana 10 se afla producatorul produsului.Daca produsul are un producator , puneti numele acestuia, in maxim 30 de caractere.Daca produsul nu are un producator, lasati cu caracterul "-"</span>
                            </v-list-item>
                        </v-list>
                        <v-list class="my-2 bg-grey-darken-4">
                            <v-list-item>
                                <span class="font-weight-normal h6"><v-icon>mdi-star-four-points-small</v-icon>Pe coloana 11 se afla dimensiunile produsului.Daca produsul nu are dimensiuni si nu are un pret pe dimensiuni , lasati caracterul "-"</span>
                                <v-list class="m-1 bg-grey-darken-1">
                                    <v-list-item>
                                        <span class="font-weight-normal h6" ><v-icon>mdi-arrow-right</v-icon>Aceasta coloana are legatura cu coloana de pret (TREBUIE SA FIE DE ACCEASI DIMENSIUNE, 4 preturi , 4 dimensiuni). Daca nu sunt egale , acesta va arunca o eroare.</span>
                                    </v-list-item>
                                    <v-list-item>
                                        <span class="font-weight-normal h6" ><v-icon>mdi-arrow-right</v-icon>Formatul in care trebuie sa aveti dimensiunile in coloana (LUNGIMExLATIME, ex. 200x90 , 200x160).DACA INTRODUCETI O PERDEA/DRAPERIE , lasati la "-".</span>
                                    </v-list-item>
                                </v-list>
                            </v-list-item>
                        </v-list>
                        <v-list class="my-2 bg-grey-darken-4">
                            <v-list-item>
                                <span class="font-weight-normal h6"><v-icon>mdi-star-four-points-small</v-icon>Pe coloana 12 se afla recomandarile de pat ale produsului.Daca produsul nu are nicio dimensiune si nu are nicio recomandare de pat , lasati caracterul "-"</span>
                                <v-list class="m-1 bg-grey-darken-1">
                                    <v-list-item>
                                        <span class="font-weight-normal h6" ><v-icon>mdi-arrow-right</v-icon>Daca produsul are dimensiuni , atunci numarul de dimensiuni per produs TREBUIE sa fie acelasi cu NUMARUL de RECOMANDARI DE PAT! Daca nu sunt, programul va afisa o eroare si importul nu se va realiza!</span>
                                    </v-list-item>
                                    <v-list-item>
                                        <span class="font-weight-normal h6" ><v-icon>mdi-arrow-right</v-icon>Formatul in care trebuie sa aveti recomandarile in coloana (LUNGIMExLATIME, ex. 200x90 , 200x160). DACA INTRODUCETI O PERDEA/DRAPERIE , lasati la "-".</span>
                                    </v-list-item>
                                </v-list>
                            </v-list-item>
                        </v-list>
                        <v-list class="my-2 bg-grey-darken-4">
                            <v-list-item>
                                <span class="font-weight-normal h6"><v-icon>mdi-star-four-points-small</v-icon>Pe coloana 13 se afla culori si codurile de culori.Aceasta este OBLIGATORIE!.</span>
                                <v-list class="m-1 bg-grey-darken-1">
                                    <v-list-item>
                                        <span class="font-weight-normal h6" ><v-icon>mdi-arrow-right</v-icon>Acestea se vor scrie in formatul (Numele culorii-codul culorii) -> EXEMPLU: Grey blue-05,alpin-green-04.</span>
                                    </v-list-item>
                                    <v-list-item>
                                        <span class="font-weight-normal h6" ><v-icon>mdi-arrow-right</v-icon>Acestea vor fi separate prin caracterul ",".Daca coloana este goala , programul va afisa o eroare si importul nu se va realiza.</span>
                                    </v-list-item>
                                </v-list>
                            </v-list-item>
                        </v-list>
                        <v-list class="my-2 bg-grey-darken-4">
                            <v-list-item>
                                <span class="font-weight-normal h6"><v-icon>mdi-star-four-points-small</v-icon>Pe coloana 14 se afla categoriile produsului. Acestea vor fi separate printr-o virgula(",").</span>
                                <v-list class="m-1 bg-grey-darken-1">
                                    <v-list-item>
                                        <span class="font-weight-normal h6" ><v-icon>mdi-arrow-right</v-icon>Coloana este obligatorie si va fi in formatul urmator: EXEMPLU: Copii,Bucatarie,Premium.</span>
                                    </v-list-item>
                                </v-list>
                            </v-list-item>
                        </v-list>
                        <v-list class="my-2 bg-grey-darken-4">
                            <v-list-item>
                                <span class="font-weight-normal h6"><v-icon>mdi-star-four-points-small</v-icon>Pe coloana 15 se afla tipul produsului. Acesta este OBLIGATORIU! Exemplu: Cuvertura, Perna </span>
                            </v-list-item>
                        </v-list>
                        <v-list class="my-2 bg-grey-darken-4">
                            <v-list-item>
                                <span class="font-weight-normal h6"><v-icon>mdi-star-four-points-small</v-icon>  Pe coloana a 16 se afla imaginile produsului. Aceasta NU  este OBLIGATORIE! </span>
                                <v-list class="bg-grey-darken-1 m-1">
                                    <v-list-item>
                                        <span class="font-weight-normal h6" ><v-icon>mdi-arrow-right</v-icon>   Daca nu aveti imagini la momentul curent pentru produse , lasati caracterul "-".</span>
                                    </v-list-item>
                                    <v-list-item>
                                        <span class="font-weight-normal h6" ><v-icon>mdi-arrow-right</v-icon>  Daca aveti imagini, programul a fost realizat intr-un mod incat: </span>
                                        <v-list class="m-1">
                                            <v-list-item>
                                                <span class="font-weight-normal h6" ><v-icon>mdi-arrow-right</v-icon>  Cauta pe DESKTOP un fisier numit "imagini_import" </span>
                                            </v-list-item>
                                            <v-list-item>
                                                <span class="font-weight-normal h6" ><v-icon>mdi-arrow-right</v-icon>  In acel fisier , trebuie sa aveti imaginile pe care vreti sa le importati. </span>
                                            </v-list-item>
                                            <v-list-item>
                                                <span class="font-weight-normal h6" ><v-icon>mdi-arrow-right</v-icon>  In coloana excelului , veti trece numele imaginilor la produsul curent, separate printr-o virgula(",") </span>
                                            </v-list-item>
                                            <v-list-item>
                                                <span class="font-weight-normal h6" ><v-icon>mdi-arrow-right</v-icon>  DE ASEMENEA , numele imaginii este de asemenea foarte important. Structura numelui ar trebuie sa fie: </span>
                                                <v-list>
                                                    <v-list-item>
                                                        <span class="font-weight-normal h6" ><v-icon>mdi-arrow-right</v-icon>  "AYLIN_X03_CUVERTURA.jpg" , daca produsul nu are fata reversibila, iar daca are "AILYN_X03_REV_CUVERTURA.jpg" </span>
                                                    </v-list-item>
                                                    <v-list-item>
                                                        <span class="font-weight-normal h6" ><v-icon>mdi-arrow-right</v-icon>  Ceea ce este cel mai relevant este separarea codului de culoare in formatul "X(codul de culoare) EX: X03,X04,X07" </span>
                                                    </v-list-item>
                                                </v-list>
                                            </v-list-item>
                                            <v-list-item>
                                                <span class="font-weight-normal h6" ><v-icon>mdi-arrow-right</v-icon>  Daca programul nu va detecta formatul "_X(CODUL DE CULOARE)_" , acesta va afisa o eroare si importul nu se va realiza! </span>
                                            </v-list-item>
                                            <v-list-item>
                                                <span class="font-weight-normal h6" ><v-icon>mdi-arrow-right</v-icon>  DE ASEMENEA, puteti lasa "-" la Imagini , si un nume de fisier la numele fisierului.Programul va rula. </span>
                                            </v-list-item>
                                        </v-list>
                                    </v-list-item>
                                </v-list>
                               
                            </v-list-item>
                        </v-list>
                        <v-list class="my-2 bg-grey-darken-4">
                            <v-list-item>
                                <span class="font-weight-normal h6"><v-icon>mdi-star-four-points-small</v-icon>Pe coloana 17, se afla numele fisierul de stocare a imaginilor. Acesta nu poate fi gol. </span>
                            </v-list-item>
                        </v-list>
                        <v-list class="my-2 bg-grey-darken-4">
                            <v-list-item>
                                <span class="font-weight-normal h6"><v-icon>mdi-star-four-points-small</v-icon>Pe coloana 18, se afla pretul de baza al produsului </span>
                                <v-list class="m-1 bg-grey-darken-1">
                                    <v-list-item>
                                        <span class="font-weight-normal h6"><v-icon>mdi-arrow-right</v-icon> Acesta nu este obligatoriu si poate fi lasat cu caracterul "-".</span>
                                    </v-list-item>
                                    <v-list-item>
                                        <span class="font-weight-normal h6"><v-icon>mdi-arrow-right</v-icon> Acesta va fi luat in considerare doar daca produsul nu are dimensiuni cu preturi diferite pe dimensiuni.</span>
                                    </v-list-item>
                                    <v-list-item>
                                        <span class="font-weight-normal h6"><v-icon>mdi-arrow-right</v-icon> Daca produsul are si un pret de baza si dimensiuni diferite , prioritatea de afisarea o vor avea variatiile de dimensiuni cu preturi diferite.</span>
                                    </v-list-item>
                                    <v-list-item>
                                        <span class="font-weight-normal h6"><v-icon>mdi-arrow-right</v-icon>Diferite erori care pot aparea vor fi afisate dupa rularea PROGRAMULUI!</span>
                                    </v-list-item>
                                </v-list>
                            </v-list-item>
                        </v-list>
                        <v-list class="my-2 bg-grey-darken-4">
                            <v-list-item>
                                <span class="font-weight-normal h6"><v-icon>mdi-star-four-points-small</v-icon>Pe coloana 19 se afla pretul de baza redus. Se aplica aceleasi reguli ca la pretul de baza al produsului. </span>
                            </v-list-item>
                        </v-list>
                </v-alert>
            </v-container>
            <v-container>
                <v-alert type="info" variant="tonal">
                    Cazul de updatare
                       <v-list class="my-2 bg-grey-darken-4">
                            <v-list-item>
                                <span class="font-weight-normal h6">
                                    <v-icon>mdi-arrow-right</v-icon> Primul rand va fi ignorat automat la updatare.Acesta consta din tipul coloanelor
                                </span>
                            </v-list-item>
                            <v-list-item>
                                <span class="font-weight-normal h6">
                                    <v-icon>mdi-arrow-right</v-icon> Daca programul detecteaza acelasi cod deja stocat in baza de date , doar ii va modifica atributele.
                                </span>
                            </v-list-item>
                            <v-list-item>
                                <span class="font-weight-normal h6">
                                    <v-icon>mdi-arrow-right</v-icon> Aceleasi reguli se aplica la modificare ca la creeare.
                                </span>
                            </v-list-item>
                            <v-list-item>
                                <span class="font-weight-normal h6">
                                    <v-icon>mdi-arrow-right</v-icon> La partea de imagini, regulile ramani aceleasi , doar ca: programul va cauta un fisier in fisierul "imagini_import" care este pe DESKTOP' +
        ' care se numeste "imagini_update". Acolo vor fi toate imaginile care sa fie introduse in loc de cele vechi. Acesta le va inlocui automat!
                                </span>
                            </v-list-item>
                       </v-list>
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