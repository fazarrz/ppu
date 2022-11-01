data = {

    jumlah : document.getElementById('isi_data'),
    tombol : document.getElementById('tombol'),
    lihat_data : document.getElementById('lihat_data'),
    form : document.getElementById('form_data'),
    hasil: [],
    reset : document.getElementById('reset')



}

data.jumlah.addEventListener('keyup', (e) => {

    const isi = e.currentTarget.value;

    if(isi === ''){
        data.tombol.disabled = true;
    }else{
        data.tombol.disabled = false;
    }

    
});

data.form.addEventListener('submit', (event) =>{

    let jumlah = data.jumlah.value;
    const pecahan = [100000, 50000, 20000, 10000, 5000, 1000, 500, 100, 50];
    let qty;
    let hasil = [];
    


    jumlah = prosesValidasi(jumlah);

    pecahan.forEach(pecahan => {
        qty = Math.floor(jumlah/pecahan);
        hasil.push({pecahan, qty});
        jumlah -= qty * pecahan;
        
    });

    hasil.push({pecahan : "SISA UANG", qty : jumlah});


    let a = "";

    hasil.forEach(c => {

        a += c.qty;
      
    });


    let hasil_akhir = "";

    if(a > 0){
        
        hasil_akhir += `<table class = "table table-responsive">`;
        hasil_akhir += `<thead>`;
        hasil_akhir += `<tr>`;
        hasil_akhir += `<th>Jumlah</th>`;
        hasil_akhir += `<th>Pecahan</th>`;
        hasil_akhir += `</tr>`;
        hasil_akhir += `</thead>`;
        hasil_akhir += `<tbody>`;
        hasil.forEach(d => {

            
            hasil_akhir += `<tr>`;

            if(d.qty > 0){

                hasil_akhir += `<td class="col-3">${d.qty}</td>`;
                
                hasil_akhir += `<td class="col-3">${formatNumToStr(d.pecahan)}</td>`;
               
            }
       
            hasil_akhir += `</tr>`;
     })
        hasil_akhir += `</tbody>`;
        hasil_akhir += `</table>`;

        
    };


    data.lihat_data.innerHTML = hasil_akhir;

    event.preventDefault();
});


const formatNumToStr = number => {

    number = number.toString().split("");
    if (number.length > 3 && number[0] !== "S") {
      number.splice(number.length - 3, 0, ".");
      number = number.join("");
      return `Rp.${number}`;
    } else if (!isNaN(number.join(""))) {
      number = number.join("");
      return `Rp.${number}`;
    } else {
      number = number.join("");
      return number;
    }
    
  };


prosesValidasi = (jumlah) =>{

    const isi_kata = jumlah.substring(jumlah.length - 3, jumlah.length);

    if(isi_kata === ",00"){
        jumlah = jumlah.slice(0, jumlah.length - 3);
    }


    if(isNaN(jumlah[0])){
        alert('Gagal!, Cek kembali masukan uang kamu :)');
        return false;
    }

    if(jumlah === "0"){
        jumlah = jumlah.replace(/^0+/, "");

    }

    if(jumlah.includes(" ")){
        jumlah = jumlah.replace(/^ +/, "");
    }


    if(jumlah.includes(".")){
        const rev = jumlah.split("").reverse();
        rev.forEach((char, i) => {
            if((i+1) % 4 === 0 && char !== "." && !isNaN(char)){
                alert('Gagal!, Cek kembali masukan uang kamu :)');
                return false;
            }
        });
    }


    jumlah = jumlah.replace(/[#_.Rp ]/g, "");

    return jumlah;



}