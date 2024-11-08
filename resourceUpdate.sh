#!/bin/sh
echo "Updating resources..."
echo "delete old resources..."
rm -fr ./medicalpark2024/
mkdir ./medicalpark2024/
mkdir ./medicalpark2024/assets/
mkdir ./medicalpark2024/img/
mkdir ./medicalpark2024/qr/
mkdir ./medicalpark2024/quiz/
echo "copy new resources..."
cp -r ./resources/assets/*.patt ./medicalpark2024/assets/
cp -r ./resources/img ./medicalpark2024/
cp -r ./resources/qr ./medicalpark2024/
cp -r ./resources/quiz ./medicalpark2024/
cp -r ./resources/assets/armarker/*.png ./medicalpark2024/quiz/images
cp ./3dmodels/1_heart/asset1.glb ./medicalpark2024/assets/
cp ./3dmodels/2_lungs/asset2.glb ./medicalpark2024/assets/
cp ./3dmodels/3_stomach/asset3.glb ./medicalpark2024/assets/
cp ./3dmodels/4_small_intestine/asset4.glb ./medicalpark2024/assets/
cp ./3dmodels/5_large_intestine/asset5.glb ./medicalpark2024/assets/
cp ./3dmodels/6_liver/asset6.glb ./medicalpark2024/assets/
cp ./3dmodels/7_pancreas/asset7.glb ./medicalpark2024/assets/
cp ./3dmodels/8_kidney/asset8.glb ./medicalpark2024/assets/
cp ./3dmodels/9_spleen/asset9.glb ./medicalpark2024/assets/
cp ./3dmodels/a_total/asseta.glb ./medicalpark2024/assets/
cp ./3dmodels/b_total2/assetb.glb ./medicalpark2024/assets/
cp ./3dmodels/c_esophagus/assetc.glb ./medicalpark2024/assets/
cp ./3dmodels/d_gallbladder/assetd.glb ./medicalpark2024/assets/
cp ./resources/carta.html ./medicalpark2024/
cp ./resources/goal.html ./medicalpark2024/
echo "create index.html..."
python3 ./resources/create_index_html.py
cp ./resources/index.html ./medicalpark2024/
rm -f medicalpark2024.zip
zip -r medicalpark2024.zip ./medicalpark2024/
echo "copy resources to server..."
scp -i ../../../Ssl/arvr/arvrsvr.pem medicalpark2024.zip opc@158.101.140.36:~/fileio/
echo "Resources updated."
ssh -i ../../../Ssl/arvr/arvrsvr.pem opc@158.101.140.36
# after login to server
# sudo su
# cd fileio
# mv ./medicalpark2024.zip /usr/share/nginx/html/ar/
# rm -fr /usr/share/nginx/html/ar/medicalpark2024/
# unzip /usr/share/nginx/html/ar/medicalpark2024.zip -d /usr/share/nginx/html/ar/
# rm -f /usr/share/nginx/html/ar/medicalpark2024.zip