<template>
    <div>
        <div>
          <p class="font-weight-light h5">{{ $t('aboutUs.title') }}</p>
          <v-divider opacity="0"></v-divider>
        </div>
        <div>
          <p class="font-wight-normal h6">La Texx, ne-am propus să aducem în 
            România cele mai fine și elegante textile pentru casă. 
            Situată în inima Brașovului, compania noastră oferă servicii de 
            manoperă premium pentru perdele și draperii, alături de o gamă 
            exclusivistă de materiale de cea mai înaltă calitate. 
            Pentru noi, fiecare perdea și fiecare draperie reprezintă mai
            mult decât un simplu element decorativ – ele sunt o expresie a rafinamentului și a bunului gust.
          </p>
          <v-divider opacity="0"></v-divider>
          <p class="font-wight-normal h6">
            Folosim țesături de top, importate de la cei
             mai renumiți producători, pentru a crea perdele și draperii elegante, 
             care îmbină armonios frumusețea cu funcționalitatea. De asemenea, ne specializăm în perdele din in, un material nobil, natural și durabil, 
            care adaugă un plus de stil oricărui interior.
          </p>
          <v-divider opacity="0"></v-divider>
          <p class="font-wight-normal h6">
            Pe lângă perdele și draperii, suntem dedicați și fabricării de perne luxoase, create pentru confortul suprem. Fie că este vorba de perne decorative sau perne pentru odihnă, fiecare produs este confecționat cu atenție la detalii, folosind materiale fine și umpluturi de înaltă calitate. În plus, oferim și o colecție de cuverturi premium, menite să completeze perfect decorul unui dormitor elegant și sofisticat.
          </p>
          <v-divider opacity="0"></v-divider>
          <p class="font-wight-normal h6">
            Ne dorim să oferim clienților noștri nu doar produse, ci o experiență unică, în care calitatea materialelor și măiestria execuției sunt pe primul loc. Alegând [Numele Companiei], alegeți o echipă pasionată de textile, cu o misiune clară: să transformăm fiecare locuință într-un spațiu cald, elegant și confortabil.
          </p>
          <v-divider opacity="0"></v-divider>
          <p class="font-wight-normal h6">
            Vă invităm să descoperiți colecțiile noastre și să beneficiați de servicii de manoperă personalizate, create special pentru a vă îndeplini toate dorințele în materie de perdele, draperii, perne și cuverturi. Calitatea ne definește, iar satisfacția clienților noștri este cea mai mare recompensă!
          </p>
          <v-divider opacity="0"></v-divider>
        </div>
    </div>
</template>



<script setup>
definePageMeta({
  title : `Texx - Despre noi`,
  keywords: [
    // **Romanian Keywords**
  'despre noi magazin textile casă',
  'firma producătoare de perdele și draperii',
  'despre brandul nostru de textile casă',
  'cine suntem și ce oferim',
  'despre compania noastră de cuverturi și perne',
  'experiență în producția de textile pentru casă',
  'valori și misiune în industria textilelor',
  'producător perdele și draperii de calitate',
  'istoria companiei noastre',
  'cumpără perdele direct de la producător',
  'companie specializată în textile premium',
  'despre noi cuverturi și perne de lux',
  'perdele și draperii fabricate cu pasiune',
  'calitate și tradiție în textile pentru casă',
  'fabricăm cuverturi și perne de înaltă calitate',
  'lideri în industria textilelor de casă',
  'despre noi  perdele și draperii personalizate',
  'angajamentul nostru față de calitate',
  'producător românesc de perdele și draperii',
  'despre brandul nostru premium de textile',
  'echipa noastră și viziunea brandului',
  'inovație și design în textile pentru casă',
  'despre noi  expertiză în textile decorative',
  'descoperă istoria brandului nostru',
  'textile casă create cu atenție la detalii',
  'companie de încredere pentru perdele și cuverturi',
  'perne și cuverturi pentru un confort suprem',
  'despre noi  magazin de perdele și perne online',
  'cine suntem și de ce ne aleg clienții',
  'firma noastră  specialiști în textile pentru casă',
  'tradiție și calitate în perdele și draperii',
  'de ce să alegi perdelele noastre?',
  'despre noi  experiență de peste X ani',
  'textile casă premium, direct de la producător',
  'despre noi  misiunea și valorile noastre',
  'colaborăm cu cei mai buni producători de textile',
  'ce ne diferențiază în industria textilelor de casă',
  'pasiunea noastră pentru design și confort',
  'servicii personalizate pentru perdele și draperii',
  'fabricăm textile de casă sustenabile și elegante',

  // **English Keywords**
  'about us home textiles company',
  'curtains and drapes manufacturer',
  'about our home textiles brand',
  'who we are and what we offer',
  'about our bedding and pillow company',
  'experience in home textiles production',
  'values and mission in the textile industry',
  'quality curtains and drapes manufacturer',
  'our company history',
  'buy curtains directly from the manufacturer',
  'specialized home textiles company',
  'about us  premium bedding and pillows',
  'curtains and drapes made with passion',
  'tradition and quality in home textiles',
  'we manufacture high-quality bedding and pillows',
  'leaders in the home textile industry',
  'about us  custom-made curtains and drapes',
  'our commitment to quality',
  'Romanian manufacturer of curtains and drapes',
  'about our premium home textile brand',
  'our team and brand vision',
  'innovation and design in home textiles',
  'about us  expertise in decorative textiles',
  'discover the story behind our brand',
  'home textiles crafted with attention to detail',
  'trusted company for curtains and bedding',
  'pillows and bedspreads for ultimate comfort',
  'about us  online store for curtains and pillows',
  'who we are and why customers choose us',
  'our company  home textiles specialists',
  'tradition and quality in curtains and drapes',
  'why choose our curtains?',
  'about us  over X years of experience',
  'premium home textiles directly from the manufacturer',
  'about us  our mission and values',
  'we collaborate with top home textile producers',
  'what makes us different in the home textile industry',
  'our passion for design and comfort',
  'personalized services for curtains and drapes',
  'we manufacture sustainable and elegant home textiles'
  ],



  layout: 'default',
  siteName : 'Texx - Despre noi',
  canonicalUrl : 'http://localhost:3000/about',
  ogType : 'website',
  ogDescription : 'Paseste pe texx pentru ati gasii perdeaua perfecta pentru casa ta',
  description : 'Paseste pe texx pentru ati gasii perdeaua si draperia perfecta pentru casa ta'
})
</script>