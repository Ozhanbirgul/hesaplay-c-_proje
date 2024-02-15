// inputlar
// ekle butonu
// listeleyen eleman

const harcamaInput = document.querySelector("#harcama");
// console.log(harcamaInput)

const fiyatInput = document.querySelector("#fiyat");
// console.log(fiyatInput)

const formBtn = document.querySelector(".ekle-btn");
// console.log(formBtn)

const list = document.querySelector(".list");
// console.log(list);

const totalInfo = document.querySelector("#total-info");
// console.log(totalInfo);

const nameInput = document.getElementById("name-input");
// console.log(nameInput)

const statusCheck = document.querySelector("#status-input");
//console.log(statusCheck);

const selectFilter = document.querySelector("#filter-select");
console.log(selectFilter);

const userName = localStorage.getItem("name");

nameInput.value = userName;

nameInput.addEventListener("change", (e) => {
  console.log(e.target.value);
  localStorage.setItem("name", e.target.value);
});

// form butona tıklanma olayını yakalamak için olay izleyicisi ekledik
formBtn.addEventListener("click", addExpense);
// harcama kartlarının bulunduğu listeye tıklanılan eleman tespiti tıklama olayı ekledik
list.addEventListener("click", handleClick);
// select box her değiştiğinde dinlemek için
selectFilter.addEventListener("change", handleFilter);

// toplam bilgisini tutmak için bir değişken tanımladık
let toplam = 0;

// her eklenen ürünle birlikte toplam fiyatın güncellenmesi toplam fonksiyonu
function updateToplam(fiyatBilgisi) {
  // dışarıdan parametre olarak fiyat bilgisi alınıyor

  //   console.log(fiyatBilgisi);
  //   inputtan gelen veri string olduğu için number hale çevriliyor
  toplam += Number(fiyatBilgisi);
  //   elde edilen toplam rakamı html tarafına gönderiyor
  totalInfo.innerText = toplam;
}

// yeni ürün ekleme fonksiyonu
function addExpense(e) {
  // formun kendinden gelen sayfa yenileme özelliğini devre dışı bırakma
  e.preventDefault();
  //   console.log("addExpense");
  //   console.log(harcamaInput);

  //    validation (doğrulama) eğer inputlardan herhangi biri boş ise alert bastır devam etme
  if (!harcamaInput.value || !fiyatInput.value) {
    alert("tüm boş alanları doldurun");
  }
  //   eğer inputlarımız dolu ise devam et
  else {
    // ekle butonuna basıldığı anda div oluşturulur
    const harcamaDiv = document.createElement("div");
    // oluşturulan dive expense classı atanıyor
    harcamaDiv.classList.add("expense");

    // eğer ödendi checbox ı işaretlenmişse
    if (statusCheck.checked) {
      console.log(statusCheck.checked);
      // kartın classlarına payed classını ekle
      harcamaDiv.classList.add("payed");
    }

    // oluşturulan divin içeriğine ilgili html elemanları veriliyor
    // tek tırnak ile sadece tek satır yazabildiğimiz ve içerisine dinamik
    // veri ekleyemediğimiz için backtick (``) kullanılır
    harcamaDiv.innerHTML = `<h2>${harcamaInput.value}</h2>
      <h2 id='value'>${fiyatInput.value}</h2>
      <div class="buttons">
          <img id='payment' src="/images/pay.png" alt="">
          <img id='remove' src="/images/remove.png" alt="">
       </div>
      `;

    //   oluşturulan harcama divi html tarafına gönderiliyor
    list.appendChild(harcamaDiv);
    //   console.log(harcamaDiv);
    // tüm işlemler tamamlandıktan sonra toplam fiyat güncelleniyor
    updateToplam(fiyatInput.value);
  }
  // inputların içeriğini işlem bittikten sonra temizlemeliyim
  harcamaInput.value = "";
  fiyatInput.value = "";
}

// silme işlemi için elemanı tespit etmek
function handleClick(e) {
  // console.log(e.target)

  // tıklanılan eleman genelde e parametresinin taget özelliğndedir
  // tıklanılan elemanı değişkene atıyoruz
  let tiklanilanEleman = e.target;
  // tıklanılan elemanın silme resmi olduğunu tespit ediyoruz
  if (tiklanilanEleman.id === "remove") {
    //console.log(tiklanilanEleman.parentElement.parentElement)
    // bir elemanın bir  üst kapsayıcı yapısını almak için parentelement kullanılır

    // ilk parentte buttons divine ulaştık ikincisinde ise harcama divine ulaştık
    const kapsayiciElement = tiklanilanEleman.parentElement.parentElement;
    //console.log(kapsayiciElement)
    // div içerisindeki fiyat bilgisine verdiğimiz id özelliği ile ulaşıyoruz

    const deletedPrice = kapsayiciElement.querySelector("#value").innerText;
    // console.log(deletedPrice)
    // ulaştığımız veri string olduğu için number çeviriyoruz daha sonra başına çıkarılmasını
    //istediğimiz için eksi koyup toplama fonksiyonuna yolluyoruz.
    updateToplam(-Number(deletedPrice));
    // istenilen bir elemanı html den kaldırma
    kapsayiciElement.remove();
  }
}

function handleFilter(e) {
  //console.log('filtre fonsksiyonu')

  const harcamaKartlari = list.childNodes;
  const filterValue = e.target.value;
  //console.log(filterValue)

  harcamaKartlari.forEach((harcamaKarti) => {
    console.log(harcamaKarti)
    switch (filterValue) {
      case "all":
        harcamaKarti.style.display = "flex";
        break;

      case "payed":
        if (!harcamaKarti.classList.contains("payed")) {
          harcamaKarti.style.display = "none";
        } else {
          harcamaKarti.style.display = "flex";
        }
        break;

        case "not-payed":

        if(harcamaKarti.classList.contains('payed')){
          harcamaKarti.style.display = 'none'
        }else{
          harcamaKarti.style.display = 'flex'
        }

        break;
    }
  });
}
