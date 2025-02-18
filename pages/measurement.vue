<template>
    <div>
        <div class="text-center p-2 m-1">
            <p class="font-weight-thin h4">Masurari cuverturi / draperii / perdele</p>
        </div>
        <v-card class="font-weight-light text-left  m-4 p-2 elevation-24 ">
            <v-card-text>
                <p class="font-weight-normal h5">Pentru a masura cat mai exact si a lua cea mai buna decizie, va recomandam sa luati in considerare urmatoarele aspecte:</p>
                <v-list >
                    <v-list-item>
                        <!-- mdistarfourpointssmall -->
                        <v-list-item>
                            <span><v-icon size="24" :icon="mdiStarFourPointsSmall"></v-icon> folositi intotdeauna o ruleta metalica suficient de rigida astfel incat sa nu flambeze la lungimi mari pentru sistemele de prindere existente</span>
                        </v-list-item>
                        <v-list-item>
                            <span><v-icon size="24" :icon="mdiStarFourPointsSmall"></v-icon> masurati lungimea galeriei sau a sinei</span>
                        </v-list-item>
                        <v-list-item>
                            <span><v-icon size="24" :icon="mdiStarFourPointsSmall"></v-icon> inaltimea (caderea) perdelei trebuie sa fie egala sau mai scurta cu un centimetru decat inaltimea (caderea) draperiei</span>
                        </v-list-item>
                        <v-list-item>
                            <span><v-icon size="24" :icon="mdiStarFourPointsSmall"></v-icon> in general, perdeaua va fi confectionata ca o parte intreaga, iar draperiile din doua parti egale</span>
                        </v-list-item>
                        <v-list-item>
                            <span><v-icon size="24" :icon="mdiStarFourPointsSmall"></v-icon> lungimea totala a perdelei se va calcula astfel:</span>
                            <br>
                            <v-list>
                                <v-list-item><v-icon size="24" color="green" :icon="mdiArrowRight"></v-icon> pentru perdelele cu model = 2 x lungimea galeriei/sinei</v-list-item>
                                <v-list-item><v-icon size="24" color="green" :icon="mdiArrowRight"></v-icon> pentru perdelele fara model = 2,5 x lungimea galeriei/sinei</v-list-item>
                            </v-list>
                        </v-list-item>
                        <v-list-item>
                            <span><v-icon size="24" :icon="mdiStarFourPointsSmall"></v-icon> lungimea totala a draperiei se va calcula astfel = 2 x lungimea galeriei/sinei</span>
                        </v-list-item>
                        <v-list-item>
                            <span><v-icon size="24" :icon="mdiStarFourPointsSmall"></v-icon>  in cazul galeriilor de lemn, masurati inaltimea din fiecare bara ( la unele galerii de lemn exista diferente de inaltime intre bara din fata pentru draperii si bara/sina U din spate pentru perdea)</span>
                        </v-list-item>
                        <v-list-item>
                            <span><v-icon size="24" :icon="mdiStarFourPointsSmall"></v-icon> incercati sa faceti o schita cat mai corecta, notand toate dimensiunile</span>
                        </v-list-item>
                        <v-list-item>
                            <span><v-icon size="24" :icon="mdiStarFourPointsSmall"></v-icon> intotdeauna comandati lungimea totala a perdelei sau draperiilor, conform calculelor din schita dvs. !</span>
                        </v-list-item>
                    </v-list-item>
                </v-list>
            </v-card-text>
        </v-card>
        
        <v-card class="font-weight-light text-left  m-4 p-2 elevation-24 ">
            <v-card-text>
                <p class="font-weight-normal h5">Cum masor dimensiunea unei perdele sau draperii in cazul unei galerii existente?</p>
                <v-list>
                    <v-list-item>
                        <span><v-icon size="24" :icon="mdiStarFourPointsSmall"></v-icon> Masurati intotdeauna lungimea galeriei intre capetele decorative ale acesteia</span>
                    </v-list-item>
                    <v-list-item>
                        <span><v-icon size="24" :icon="mdiStarFourPointsSmall"></v-icon> Inaltimea (caderea) perdelei/draperiei va recomandam sa o masurati de sub inelele de prindere de pe bara pana la una dintre aceste variante, conform dorintei dvs. ( vezi desenul de mai jos): </span>
                        <br>
                        <v-list>
                            <v-list-item>
                                <v-icon size="24" color="green" :icon="mdiArrowRight"></v-icon> pana la podea + 20 cm daca doriti sa stea pe podea ( recomandam aceasta inaltime doar in cazul draperiilor) – varianta C
                            </v-list-item>
                            <v-list-item>
                                <v-icon size="24" color="green" :icon="mdiArrowRight"></v-icon> 1-2 cm deasupra podelei (varianta D)
                            </v-list-item>
                            <v-list-item>
                                <v-icon size="24" color="green" :icon="mdiArrowRight"></v-icon> 5-10 cm sub glaf, unde este posibil sau 5 cm deasupra caloriferului (varianta E)
                            </v-list-item>
                            <v-list-item>
                                <v-icon size="24" color="green" :icon="mdiArrowRight"></v-icon> 1-2 cm deasupra glafului (varianta F)
                            </v-list-item>
                        </v-list>
                    </v-list-item>
                </v-list>
            </v-card-text>
        </v-card>
        <v-card class="font-weight-light text-left  m-4 p-2 elevation-24 ">
            <v-card-text>
                <p class="font-weight-normal h5">Cum masor dimensiunea unei perdele sau draperii in cazul unei galerii care se va monta ulterior?</p>
                <v-row>
                    <v-col cols="12" md="7" sm="12" xs="12">
                        <v-list>
                            <v-list-item>
                                <span><v-icon size="24" :icon="mdiStarFourPointsSmall"></v-icon> Masurati intotdeauna lungimea sinei montate sau, daca se monteaza ulterior, lungimea dorita, tinand cont de 15-30 cm de fiecare parte a golului de fereastra si de diverse impedimente ( pereti, mobila, plante, etc). Daca doriti sa montati sina din perete in perete, masurati lungimea dintre pereti.</span>
                            </v-list-item>
                            <v-list-item>
                                <span><v-icon size="24" :icon="mdiStarFourPointsSmall"></v-icon> Inaltimea (caderea) perdelei/draperiei va recomandam sa o masurati de sus din tavan pana la: </span>
                                <br>
                                <v-list>
                                    <v-list-item>
                                        <span>  <v-icon size="24" color="green" :icon="mdiArrowRight"></v-icon> pana la podea + 20 cm daca doriti sa stea pe podea (recomandam aceasta inaltime doar in cazul draperiilor) – varianta C</span>
                                    </v-list-item>
                                    <v-list-item>
                                        <span>  <v-icon size="24" color="green" :icon="mdiArrowRight"></v-icon>1-2 cm deasupra podelei (varianta D) </span>
                                    </v-list-item>
                                    <v-list-item>
                                        <span>  <v-icon size="24" color="green" :icon="mdiArrowRight"></v-icon>5-10 cm sub glaf, unde este posibil sau 5 cm deasupra caloriferului (varianta E) </span>
                                    </v-list-item>
                                    <v-list-item>
                                        <span>  <v-icon size="24" color="green" :icon="mdiArrowRight"></v-icon>1-2 cm deasupra glafului (varianta F) </span>
                                    </v-list-item>
                                </v-list>
                            </v-list-item>
                            <v-list-item>
                                <span><v-icon size="24" :icon="mdiStarFourPointsSmall"></v-icon> C = inaltimea din tavan pana in podea + 20 cm daca vreti ca draperia sa stea pe podea</span>
                            </v-list-item>
                            <v-list-item>
                                <span><v-icon size="24" :icon="mdiStarFourPointsSmall"></v-icon> D = inaltimea din tavan pana deasupra podelei cu 1-2 cm</span>
                            </v-list-item>
                            <v-list-item>
                                <span><v-icon size="24" :icon="mdiStarFourPointsSmall"></v-icon> E = inaltimea din tavan pana sub glaf sau pana deasupra caloriferului</span>
                            </v-list-item>
                            <v-list-item>
                                <span><v-icon size="24" :icon="mdiStarFourPointsSmall"></v-icon> F = inaltimea din tavan pana deasupra glafului cu 1-2 cm</span>
                            </v-list-item>
                            <v-list-item>
                                <span><v-icon size="24" :icon="mdiStarFourPointsSmall"></v-icon> Nota: intotdeauna sa masurati inaltimea in cel putin 3 puncte, de la stanga la dreapta; daca sunt diferente mari intre inaltimile luate, alegeti inaltimea cea mai scurta. Sau cereti-ne sfatul!</span>
                            </v-list-item>
                        </v-list>
                    </v-col>
                    <v-col cols="12" sm="12"  xs="12" md="5">
                        <NuxtImg src="/measurement1.png" preload 
                        :height="height ? 250 : 1000"
                        :width="height ? 250 : 1000"></NuxtImg>
                    </v-col>
                </v-row>
                
            </v-card-text>
        </v-card>
       
        <v-card class="font-weight-light text-left  m-4 p-2 elevation-24 ">
            <v-card-text>
                <p class="font-weight-normal h5">Cum masor dimensiunea unui stor roman care se monteaza in interiorul golului de fereastra</p>
                <v-list>
                    <v-list-item>
                        <span><v-icon size="24" :icon="mdiStarFourPointsSmall"></v-icon>In acest caz, masurati inaltimea golului de fereastra in cel putin trei puncte; la fel si pentru latimea sistemului. Tineti cont de toate dimensiunile si alegeti valoarea cea mai mica a inaltimii si latimii.</span>
                    </v-list-item>
                    <v-list-item>
                        <span><v-icon size="24" :icon="mdiStarFourPointsSmall"></v-icon> Nota: In luarea deciziei de a monta un sistem roman in gol de fereastra tineti cont de modul de deschidere al ferestrei, de distanta dintre profilul ferestrei si pereti laterali, de lungimea necesara de strangere a sistemului in partea superioara, permitand deschiderea ferestrei, etc.</span>
                    </v-list-item>
                    <v-list-item>
                        <span><v-icon size="24" :icon="mdiStarFourPointsSmall"></v-icon> Mult mai folosit este varianta montata in afara golului de fereastra, fiind mult mai practica.</span>
                    </v-list-item>
                </v-list>
                <NuxtImg src="/interior_window.png" preload 
                :height="height ? 250 : 1000"
                        :width="height ? 250 : 1000"></NuxtImg>
            </v-card-text>
        </v-card>
        <v-card class="font-weight-light text-left  m-4 p-2 elevation-24 ">
            <v-card-text>
                <p class="font-weight-normal h5">Cum masor dimensiunea unui stor roman care se monteaza in exteriorul golului de fereastra</p>
                <v-list>
                    <v-list-item>
                        <span><v-icon size="24" :icon="mdiStarFourPointsSmall"></v-icon> Masurati latimea golului de fereastra si adaugati cate 10 cm de fiecare parte, stanga si dreapta; aceasta este latimea storului roman.</span>
                    </v-list-item>
                    <v-list-item>
                        <span><v-icon size="24" :icon="mdiStarFourPointsSmall"></v-icon> Inaltimea storului se masoara astfel: inaltimea golului de fereastra la care se adauga 25 – 30 cm deasupra golului necesari ca storul sa fie strans, astfel incat sa permita deschiderea ferestrei, iar sub golul de fereastra masurati pana unde doriti sa cada storul (tinand cont de ceea ce exista: glaf, calorifer, podea, etc)</span>
                    </v-list-item>
                    <v-list-item>
                        <span><v-icon size="24" :icon="mdiStarFourPointsSmall"></v-icon> Multe dintre ferestre au doua sau mai multe canate; in acest caz, incercati sa repartizati storurile tinand cont de numarul acestora, precum si de modul de deschidere al ferestrei/ferestrelor.</span>
                    </v-list-item>
                </v-list>
                <NuxtImg src="/exterior_window.png" preload 
                :height="height ? 250 : 1000"
                        :width="height ? 250 : 1000"></NuxtImg>
            </v-card-text>
        </v-card>
        <v-card class="font-weight-light text-left  m-4 p-2 elevation-24 ">
            <v-card-text>
                <p class="font-weight-normal h5">Cum masor dimensiunea unui panel japonez?</p>
                <v-list>
                    <v-list-item>
                        <span><v-icon size="24" :icon="mdiStarFourPointsSmall"></v-icon>Latimea unui panel japonez poate varia intre 50 si 70 cm (optim 60 cm).</span>
                    </v-list-item>
                    <v-list-item>
                        <span><v-icon size="24" :icon="mdiStarFourPointsSmall"></v-icon>De obicei, aceste paneluri culiseaza pe o sina cu cel putin 3 canale, montata in tavan. Pentru a afla inaltimea panelului, masurati distanta dintre tavan si pana unde doriti sa cada panelul.</span>
                    </v-list-item>
                    <v-list-item>
                        <span><v-icon size="24" :icon="mdiStarFourPointsSmall"></v-icon>   Pe cat posibil, recomandam ca panelul sa cada pana la 1-2 cm deasupra podelei, pentru un aspect cat mai placut.</span>
                    </v-list-item>
                    <v-list-item>
                        <span><v-icon size="24" :icon="mdiStarFourPointsSmall"></v-icon>  Numarul de paneluri se afla impartind lungimea sinei la lungimea panelului + 1 panel (de exemplu, daca sina are 300 cm, numarul de paneluri este de 5, dar recomandam adaugarea cel putin a unuia suplimentar, pentru acoperirea optima a ferestrei). De asemenea, puteti folosi un singur model de material sau puteti combina doua materiale (perdea/perdea sau perdea/draperie).
                    Totul tine de imaginatia dvs!</span>
                    </v-list-item>
                </v-list>
            </v-card-text>
        </v-card>
        <v-card class="font-weight-light text-left  m-4 p-2 elevation-24 ">
            <v-card-text>
                <p class="font-weight-normal h5">Cum masor dimensiunea unei cuverturi?</p>
                <v-list>
                    <v-list-item>
                        <span><v-icon size="24" :icon="mdiStarFourPointsSmall"></v-icon> Daca ati ales draperiile pentru o camera si doriti o cuvertura care sa se asorteze cu ele, puteti alege un material identic sau apropiat ca model, nuanta, textura sau culoare. Pentru aceasta, masurati dimensiunile saltelei si adaugati astfel:</span>
                        <v-list>
                            <v-list-item>
                                <span>  <v-icon size="24" color="green" :icon="mdiArrowRight"></v-icon> la latime: de fiecare parte a patului, stanga-dreapta, cat doriti sa cada cuvertura, adaugand in plus 5-10 cm pentru ca, cuvertura sa stea lejer pe pat</span>
                            </v-list-item>
                            <v-list-item>
                                <span>  <v-icon size="24" color="green" :icon="mdiArrowRight"></v-icon> la lungime: cat doriti sa intre sub perne, recomandabil 20-30 cm, iar daca patul nu are margine inferioara (partea de la picioare), sa fie aceeasi cadere ca si la latime</span>
                            </v-list-item>
                        </v-list>
                    </v-list-item>
                    <v-list-item>
                        <!-- aici un v-card pt exemplu -->
                        <span><v-icon size="24" :icon="mdiStarFourPointsSmall"></v-icon> De exemplu: pentru un pat de 160/200:
                            <br>
                            <v-list>
                                <v-list-item>
                                    <span> <v-icon size="24" color="green" :icon="mdiArrowRight"></v-icon> latimea = 160cm salteaua + 20cm caderea stanga + 20cm caderea dreapta + 10cm pentru lejeritate = 210 cm </span>
                                </v-list-item>
                                <v-list-item>
                                    <span> <v-icon size="24" color="green" :icon="mdiArrowRight"></v-icon>  lungimea = 200cm salteaua + 40cm la perne + 20cm caderea la picioare + 10cm lejeritatea = 270 cm</span>
                                </v-list-item>
                                <v-list-item>
                                    <span> <v-icon size="24" color="green" :icon="mdiArrowRight"></v-icon>    In cazul in care doriti sa cada dintr-o parte in alta pana pe podea, masurati inaltimea patului
                        pe fiecare parte la care adaugati latimea saltelei si 5-10 cm pentru lejeritate.</span>
                                </v-list-item>
                                <v-list-item>
                                    <span> <v-icon size="24" color="green" :icon="mdiArrowRight"></v-icon>    La fel si pentru lungime, 
                        la lungimea saltelei adaugati inaltimea patului si cat doriti sa intre sub perne (atentie: nu mai mult de 270 cm,
                        materialele au in general 280 cm din care se scad tivurile !)</span>
                                </v-list-item>
                            </v-list>
                    
                    
                    </span>
                    </v-list-item>
                </v-list>
            </v-card-text>
        </v-card>
        <v-card class="font-weight-light text-left  m-4 p-2 elevation-24 ">
            <v-card-text>
                <p class="font-weight-normal h5">Cum masor pentru ferestre atipice (inclinate, curbe, etc)?</p>
                <v-list>
                    <v-list-item>
                        <span><v-icon size="24" :icon="mdiStarFourPointsSmall"></v-icon> In acest caz, va rugam sa ne contactati prin telefon sau prin email la office@perdele-online.ro, incercand o descriere cat mai adecvata a ferestrei atipice.</span>
                    </v-list-item>
                    <v-list-item>
                        <span><v-icon size="24" :icon="mdiStarFourPointsSmall"></v-icon> Nu uitati: pentru ca sunteti responsabili pentru calitatea masuratorilor efectuate, incercati sa faceti acest lucru cat mai bine posibil.</span>
                    </v-list-item>
                    <v-list-item>
                        <span><v-icon size="24" :icon="mdiStarFourPointsSmall"></v-icon> Nu raspundem pentru masuratorile defectuoase si nici pentru erorile de calcul privind necesarul de material. Daca aveti nevoie de sfatul nostru, nu ezitati sa ne contactati. </span>
                    </v-list-item>
                    <v-list-item>
                        <span><v-icon size="24" :icon="mdiStarFourPointsSmall"></v-icon>  Conform politicii companiei si a legilor in vigoare, materialele comandate la metru sau cele comandate pentru un anumit sistem de prindere, nu pot fi returnate! </span>
                    </v-list-item>
                   
                </v-list>
            </v-card-text>
        </v-card>
    </div>
</template>

<script setup>
import { mdiArrowRight, mdiStarFourPointsSmall } from '@mdi/js';
import { useDisplay } from 'vuetify';
definePageMeta({
  title : 'Cum masor',
  layout: 'default',
  keywords: 'Cum măsori corect o cuvertură, Ghid măsurare cuverturi de pat, Cum alegi dimensiunea potrivită pentru o cuvertură, Cuverturi de pat – dimensiuni și recomandări, Calcul dimensiune cuvertură pat matrimonial, Cum măsori o draperie pentru ferestre mari, Ghid măsurare draperii și perdele, Măsurători ideale pentru perdele elegante, Cum alegi lungimea corectă a draperiilor, Perdele scurte vs. perdele lungi – cum măsori corect, Măsurare draperii blackout pentru întunecare totală, Cum alegi perdelele perfecte pentru bucătărie, Măsurători pentru perdele termoizolante, Cum să măsori perdelele pentru a bloca lumina, Cum măsori perdelele pentru izolare fonică, Cum alegi perdelele pentru ferestre neobișnuite, Dimensiuni ideale pentru perdele rustice, Cum să măsori perdelele pentru camera copiilor, Sfaturi măsurare perdele pentru pătuț bebeluși, Perdele și draperii pentru tavane înalte – ghid măsurare, Cum măsori corect materialul pentru perdele personalizate, Cum să măsori perdelele pentru un efect elegant, Măsurători pentru perdele moderne – ghid complet, Perdele cu prindere în tavan – cum să măsori, Alegerea corectă a dimensiunii pentru perdelele de living, Cum să măsori corect o draperie termoizolantă, Ghid măsurare pentru perdele și draperii din catifea, Cum să măsori perdelele pentru un look boem, Măsurători perdele pentru ferestre arcuite, Cum măsori perdelele pentru a obține un efect fluid, Draperii pentru dormitor – ghid măsurare corectă, Cum să măsori perdelele pentru un stil minimalist, Măsurători pentru perdele vintage și retro, Perdele lungi până la podea – cum le măsori corect, Cum alegi lungimea și lățimea ideală pentru perdele, Măsurători pentru perdele și draperii cu inele, Cum să măsori corect perdelele cu rejansă, Cum măsori perdelele pentru a crea iluzia unui spațiu mai mare, Cum să măsori perdelele pentru un aspect luxuriant, Sfaturi pentru măsurarea corectă a perdelelor cu prindere pe galerie,How to measure a bedspread correctly, Bedspread measuring guide, Choosing the right size bedspread, Bedspread size recommendations, How to measure a bedspread for a king-size bed, Measuring curtains for large windows, Drapery and curtain measuring guide, Best measurements for elegant curtains, How to choose the perfect curtain length, Short vs. long curtains – how to measure properly, Measuring blackout curtains for full darkness, How to measure kitchen curtains, Measuring thermal insulation curtains, How to measure curtains for light blocking, How to measure soundproof curtains, How to measure curtains for unusual window shapes, Ideal dimensions for rustic curtains, Measuring curtains for a kids room, Measuring crib curtains  expert tips, High ceiling curtains – measuring guide, How to measure fabric for custom-made curtains, How to measure curtains for a luxurious effect, Modern curtain measurements – complete guide, Ceiling-mounted curtains – how to measure, Choosing the right curtain size for your living room, How to measure thermal curtains correctly, Velvet curtain measurement guide, How to measure curtains for a bohemian style, Measuring curtains for arched windows, How to measure curtains for a flowing effect, Bedroom drapes – proper measuring guide, How to measure curtains for a minimalist style, Vintage and retro curtain measurements, Floor-length curtains – how to measure them properly, How to choose the perfect curtain width and length, Measuring curtains and drapes with rings, How to measure curtains with pinch pleats, How to measure curtains for a spacious look, How to measure curtains for a rich, full effect, Expert tips for measuring curtains with rod pockets',
  siteName : 'Texx - Cum masor',
  canonicalUrl : 'http://localhost:3000/measurement',
  ogType : 'article',
  ogDescription : 'La noi puteti gasii cuverturi si perdele/draperii de inalta calitate. Va asteptam !!',
  description : 'Cuverturi si perdele/draperii de inalta calitate. Livrare acasa. Livrare gratis la comanda de peste 300 RON. Livrare in toata tara! '
})


const {name} = useDisplay()
const height = computed(() => {
    switch (name.value) {
      case 'xs': return true
      default : return 3
    }
})
</script>



    
   
    
   
   
       
        
    
   
   
    
