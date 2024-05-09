# Projenin Kurulumu Öncesi Yapılması Gerekenler:

## a) Kullanılan sürümler:
* Bu proje içerisinde NodeJS'in `v20.11.0` sürümü kullanılmıştır.
* MongoDB'nin ise `7.0.5` sürümü kullanılmaktadır.
* İndirme işlemlerini daha kolay bir şekilde yapmanız için şu [NodeJS ve MongoDB Nasıl İndirili?](https://www.youtube.com/watch?v=jIErUg6L4EA) videoyu izlemeniz tavsiye edilir.

<hr>

## b) Gerekli paketlerin kurulması:
* Öncelikli olarak projeyi herkesin görebileceği bir alana değil herhangi bir disk içerisinde çok kullanılmayan bir alana koyunuz.
  * "Zira localde insanlar kolayca müdahale edemesin"
* Sonrasında ise **NodeJS** ve **MongoDB** kurulu ise ilk olarak proje dosyalarının içerisine giriyoruz. (İster code editörü ile ister terminal ile).
  * Ana proje dosyasının içerisinde iken 
  ```shell
  npm install
  ```
  komutu ile birlikte `node_modules` klasörünü dolayısıyla projemiz için gerekli olan paketleri kuruyoruz.
  * Sonrasında ise projemizin düzgün bir şekilde çalışabilmesi için `.env` isimli dosyayı oluşturup içerisine gerekli olan verileri ekliyoruz.
    * "Bu veriler size **developer** tarafından verilecektir.

<hr>


## c) Projeyi çalıştırma:
* Sürümü ayaladık, gerekli olan paketleri kurduk ve artık iş projeyi çalıştırmaya geldi. 
* Projeyi çalıştırmak için:
  * `node app.js` Komutunu kullanabiliriz ki bu komut **NodeJS**'in temel komutudur.  

  * `npm start` Komutu ise kendi içerisinde yine `node app.js` komutunu çalıştırır ve aynı şekilde proje çalışır.

  * `npm run dev` Bu komut ise projeyi `nodemon` isimli bir paket üzerinden çalıştırır. Bu paket geliştiriciler tarafından sürekli olarak projeyi kill edip yeniden çalıştırma sorununu aşmak için tasarlanmıştır. 
    * "Geliştirme ortamları için kullanılır"

#### `PM2` Paketinin önemi:
* Yukarıda saymış olduğum `node app.js` ve `npm start` komutları aynı işi yaptığından projeyi çalıştırır fakat bir sorun ile birlikte proje çalıştıktan sonra eğer terminal kapatılırsa bu durumda projede kapatılmış demektedir.
  * Terminal kapatıldığında eğer projenin kapatılmasını istemiyor veya `node app.js` komutunun terminali kilitlemesini istemiyorsak bu durumda `pm2` isimli paketi indirmemiz gerekecektir.
* `pm2` paketi sayesinde bilgisayar açıkken terminal eğer kapatılırsa bu durumda proje çalışmaya sorunsuz bir şekilde devam edecektir.
* `pm2` paketini indirmek için terminali açıp
```shell
npm install pm2@latest -g
```
komutunu kullanarak indirme işlemine başlıyoruz.
* İndirme işlemini tamamladıktan sonra çalışan uygulamaları görmek için
```shell 
pm2 list
```
komutunu kullanıyoruz.
* Başlangıçta herhangi bir uygulama çalışır durumda olmayacağın kendi projemizi çalıştırmak için yine projemizin içerisine giriyoruz.
  * "Tüm dosyaların bulunduğu ebeveyn dosyanın içerisine terminalle veya code editörü ile birlikte giriyoruz"
* Daha sonrasında ise projemizi çalıştırmak için 
```shell
pm2 start app.js
```
komutunu giriyoruz.
* Terminalde `status` alanında `app` isimli uygulamanın `status` değerini `online` olarak gördüysek işlem başarılı bir şekilde tamamlanmış demektedir.
* Çalışan uygulamayı durdurmak için `pm2 stop app` veya tümüyle silmek(list alanından) için `pm2 delete app` komutlarını kullanabiliriz.
* Durdurulan veya silinen(list alanından) uygulamayı tekrardan çalıştırmak için tekrardan `pm2 start app` komunutu kullanmak yeterli olacaktır.
  * `pm2 start app.js` komutu ile projeyi çalıştırmak için projenin ana klasörü içerisinde olmanız gerektiğini unutmayın. Zira **app.js** isimli dosyanın nerede olduğunu bilmesi gerekiyor.