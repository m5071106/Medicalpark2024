# 資産の登録状況を確認しながらindex.htmlを生成する
import os
import csv

debug_mode = False

# 古いindex.htmlを削除
index_html_path = os.path.dirname(__file__) + '/index.html'

if os.path.exists(index_html_path):
    os.remove(index_html_path) 

# index.html のテンプレートファイルを作成
header = '''
    <!doctype html>
    <html>
    <head>
        <meta charset="UTF-8">
        <script src="https://aframe.io/releases/1.2.0/aframe.min.js"></script>
        <script src="https://cdn.rawgit.com/jeromeetienne/AR.js/2.0.7/aframe/build/aframe-ar.js"></script>
        <script src="https://raw.githack.com/donmccurdy/aframe-extras/master/dist/aframe-extras.loaders.min.js"></script>
        <script src="https://raw.githack.com/AR-js-org/studio-backend/master/src/modules/marker/tools/gesture-detector.js"></script>
        <script src="https://raw.githack.com/AR-js-org/studio-backend/master/src/modules/marker/tools/gesture-handler.js"></script>
        <style>
            #overlay1 {
                position: fixed;
                bottom: 10px;
                left: 10px;
                background-color: rgba(255, 255, 255, 0.8);
                padding: 10px;
                border-radius: 5px;
                font-size: 16pt;
            }
            #overlay2 {
                position: fixed;
                top: 10px;
                right: 10px;
                background-color: rgba(255, 255, 200, 0.8);
                padding: 10px;
                border-radius: 5px;
                font-size: 16pt;
                color: blue;
            }
    '''

if debug_mode:
    header += '''
            #overlay3-1 {
                position: fixed;
                bottom: 200px;
                left: 10px;
                background-color: rgba(255, 200, 200, 0.8);
                padding: 10px;
                border-radius: 5px;
                font-size: 16pt;
            }
            #overlay3-2 {
                position: fixed;
                bottom: 200px;
                left: 110px;
                background-color: rgba(200, 255, 200, 0.8);
                padding: 10px;
                border-radius: 5px;
                font-size: 16pt;
            }
            #overlay3-3 {
                position: fixed;
                bottom: 200px;
                left: 110px;
                background-color: rgba(200, 200, 255, 0.8);
                padding: 10px;
                border-radius: 5px;
                font-size: 16pt;
            }
            #overlay3-4 {
                position: fixed;
                bottom: 200px;
                left: 110px;
                background-color: rgba(255, 255, 200, 0.8);
                padding: 10px;
                border-radius: 5px;
                font-size: 16pt;
            }
        '''

header += '''
        </style>
    </head>
    '''

with open(index_html_path, 'w', encoding='utf-8') as f:
    f.write(header)

body_1 = '''
    <body style="margin: 0; overflow: hidden;">
        <a-scene
            vr-mode-ui="enabled: false;"
            loading-screen="enabled: false;"
            renderer="logarithmicDepthBuffer: true;"
            arjs="trackingMethod: best; sourceType: webcam; debugUIEnabled: false;"
            id="scene"
            embedded
            gesture-detector
        >
    '''

with open(index_html_path, 'a', encoding='utf-8') as f:
    f.write(body_1)

# assetsディレクトリの中身から拡張子がpattで終わる一覧を取得. アルファベット順にソートする
assets = sorted(os.listdir(os.path.dirname(__file__) + '/assets'))
assets = [asset for asset in assets if asset.endswith('.patt')]

body_2 = '''
            <!-- assets ST -->
            <a-assets>
    '''

for asset in assets:
    # 拡張子の前までを取得
    asset_name = asset.split('.')[0]
    body_2 += f'''
                <a-asset-item
                    id="{asset_name}"
                    src="assets/{asset_name}.glb"
                ></a-asset-item>
        '''

body_2 += '''
            </a-assets>
            <!-- assets ED -->
    '''

with open(index_html_path, 'a', encoding='utf-8') as f:
    f.write(body_2)

count = 0
option = ''
body_3 = ''
for asset in assets:
    asset_name = asset.split('.')[0]
    count += 1
    if asset_name == 'assetx':
        option = '-'
    else:
        option = ''

    body_3 += f'''
            <!-- {asset_name} ST -->
            <a-marker
                id="id-{asset_name}"
                type="pattern"
                preset="custom"
                url="assets/{asset_name}.patt"
                raycaster="objects: .clickable"
                emitevents="true"
                cursor="fuse: false; rayOrigin: mouse;"
            >
                <a-entity
                    id="id-{asset_name}-1"
                    scale="4.0 4.0 4.0"
                    position="0 0 0"
                    rotation="0 0 0"
                    animation-mixer="loop: repeat"
                    gltf-model="#{asset_name}"
                    class="clickable"
                    gesture-handler
                >
                </a-entity>
            </a-marker>
            <!-- {asset_name} ED -->
        '''

                    # rotation="180 {option}90 -90"

with open(index_html_path, 'a', encoding='utf-8') as f:
    f.write(body_3)

body_4 = '''
            <a-entity camera></a-entity>
            <a-entity light="type: ambient; intensity: 1.1;"></a-entity>
        </a-scene>
        <div id="overlay2">
            <label id="stamp">カメラアクセスを許可してご利用ください</label>
        </div>
    '''

if debug_mode:
    body_4 += '''
        <div id="overlay3-1"></div>
        <div id="overlay3-2"></div>
        <div id="overlay3-3"></div>
        <div id="overlay3-4"></div>
        '''

body_4 += '''
        <div id="overlay1">
            <label id="messagelabel">
                <table>
                    <tr>
                        <td><img src="./img/ojigi.jpeg" height="50px"/></td>
                        <td>起動にちょっと時間がかかることがあります</td>
                    </tr>
                </table>
            </label>
        </div>
        <script>
            const markers = document.querySelectorAll('a-marker');
            const label1 = document.querySelector('#overlay1');
            const label2 = document.querySelector('#overlay2');
    '''

if debug_mode:
    body_4 += '''
            const label3_1 = document.querySelector('#overlay3-1');
            const label3_2 = document.querySelector('#overlay3-2');
            const label3_3 = document.querySelector('#overlay3-3');
            const label3_4 = document.querySelector('#overlay3-4');
        '''

body_4 += '''
            var msg1 = "";
            var msg2 = "";
            var prevMsg1 = "";
            var numOfMarkers = 0;
            markers.forEach(marker => {
                marker.addEventListener('markerFound', () => {
                    const markerId = marker.getAttribute('id');
                    msg1 = "";
                    msg2 = "";
                    numOfMarkers++;
                    switch(markerId) {
    '''

# word_list.csv を読み込む
with open(os.path.dirname(__file__) + '/word_list.csv', 'r', encoding='utf-8') as f:
    reader = csv.reader(f)
    for row in reader:
        body_4 += f'''
                        case 'id-{row[0]}':
                            msg1 = '{row[1]}';
                            msg2 = '{row[2]}';
                            break;
            '''

body_4 += '''
                    default:
                        msg1 = "\\n";
                        msg2 = "default";
                        break;
                    }
                    label1.textContent = prevMsg1 + " " + msg1;
                    label2.textContent = msg2; 
                    prevMsg1 = prevMsg1 + " " + msg1;
    '''

if debug_mode:
    body_4 += '''
                    label1.textContent = "上記4つの中で一番大きな臓器はどれですか？";
                    label2.textContent = "問題1/2";
                    label3_1.textContent = "肝臓";
                    label3_2.textContent = "胃";
                    label3_3.textContent = "脾臓";
                    label3_4.textContent = "心臓";
        '''

body_4 += '''
                });

                marker.addEventListener('markerLost', () => {
                    const markerId = marker.getAttribute('id');
                    numOfMarkers--;
                    if (numOfMarkers == 0) {
                        label1.textContent = "";
                        label2.textContent = "";
                        prevMsg1 = "";
                    }
                });
            });
        </script>
    </body>
</html>
    '''

with open(index_html_path, 'a', encoding='utf-8') as f:
    f.write(body_4)
