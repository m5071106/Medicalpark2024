@echo off
echo Updating resources...
echo delete old resources...
rmdir /s /q medicalpark2024
mkdir medicalpark2024
mkdir medicalpark2024\assets
mkdir medicalpark2024\img
mkdir medicalpark2024\qr
mkdir medicalpark2024\quiz
echo copy new resources...
xcopy /s /y resources\assets\*.patt medicalpark2024\assets
xcopy /s /y resources\img\* medicalpark2024\img
xcopy /s /y resources\qr\* medicalpark2024\qr
xcopy /s /y resources\quiz\* medicalpark2024\quiz
xcopy /s /y resources\assets\armarker\*.png medicalpark2024\quiz\images
copy 3dmodels\1_heart\asset1.glb medicalpark2024\assets
copy 3dmodels\2_lungs\asset2.glb medicalpark2024\assets
copy 3dmodels\3_stomach\asset3.glb medicalpark2024\assets
copy 3dmodels\4_small_intestine\asset4.glb medicalpark2024\assets
copy 3dmodels\5_large_intestine\asset5.glb medicalpark2024\assets
copy 3dmodels\6_liver\asset6.glb medicalpark2024\assets
copy 3dmodels\7_pancreas\asset7.glb medicalpark2024\assets
copy 3dmodels\8_kidney\asset8.glb medicalpark2024\assets
copy 3dmodels\9_spleen\asset9.glb medicalpark2024\assets
copy 3dmodels\a_total\asseta.glb medicalpark2024\assets
copy 3dmodels\b_total2\assetb.glb medicalpark2024\assets
copy 3dmodels\c_esophagus\assetc.glb medicalpark2024\assets
copy 3dmodels\d_gallbladder\assetd.glb medicalpark2024\assets
copy resources\carta.html medicalpark2024\
copy resources\goal.html medicalpark2024\
echo create index.html...
python resources\create_index_html.py
copy resources\index.html medicalpark2024\
del medicalpark2024.zip
powershell Compress-Archive -Path medicalpark2024 -DestinationPath medicalpark2024.zip
echo copy resources to server...
@REM pscp -i ..\..\Ssl\arvr\arvrsvr.pem medicalpark2024.zip opc@158.101.140.36:~/fileio/
@REM echo Resources updated.
@REM plink -i ..\..\Ssl\arvr\arvrsvr.pem opc@158.101.140.36
rem after login to server
rem sudo su
rem cd fileio
rem mv ./medicalpark2024.zip /usr/share/nginx/html/ar/
rem rm -fr /usr/share/nginx/html/ar/medicalpark2024/
rem unzip /usr/share/nginx/html/ar/medicalpark2024.zip -d /usr/share/nginx/html/ar/
rem rm -f /usr/share/nginx/html/ar/medicalpark2024.zip