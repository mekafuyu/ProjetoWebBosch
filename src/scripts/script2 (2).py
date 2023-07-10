import json
import sys
import math
import numpy as np
from PIL import Image, ImageFilter, ImageOps
from skimage import filters
from skimage.io import imread

# IMRPATH = './public/img/results/'
# JSONPATH = './src/scripts'
IMRPATH = '../../public/img/results/'
JSONPATH = './'

# Imagem passada pelo usuário
# IMAGEM = sys.argv[1]
IMAGEM = '../../public/img/exams/ofc7.jpeg'
img = imread(IMAGEM, as_gray=True)

# Threshold idela para as imagens
threshold = int((filters.threshold_otsu(img))*255)

# Abrir e cortar bordas da imagem
img = Image.open(IMAGEM).convert('L').filter(ImageFilter.BLUR)
width, height = img.size
img = img.crop(( width/12, height/12, width*11/12, height*11/12 ))
img.save(IMRPATH+"teste2.png")

# Abrir imagem como um array de pretos e brancos
im_gray = np.array(img)
im_bin = (im_gray > threshold) * 255

# Variaveis para lidar com tamanhos diferentes de imagem
metrica = len( im_bin[0] )
tolerancia = int( metrica * 0.025 )
pontos = []

# # Função para comparar proximidade dos pontos mais tarde
def isPointNear(point, newpoints):
    for newpoint in newpoints:
        distancia = int(math.sqrt((point[0]-newpoint[0])**2 + (point[1]-newpoint[1])**2))
        if distancia < tolerancia*3:
            im_bin[point[0], point[1]] = 0
            return True
    return False

# Contador de pretos
countPreto = 0
for x in range( len(im_bin) ):
    for y in range( len(im_bin[0]) ):
        
        if im_bin[x,y] == 0:
            countPreto += 1
            continue;
        
        if countPreto > tolerancia and countPreto < tolerancia * 4:
            offset = y - int(countPreto/2)
            
            pinta = True
            
            # Verificar a área ao redor do ponto encontrado
            for i in range(tolerancia):
                # Try catch pra não explodir quando próximo às extremidades
                try:
                    cima = im_bin[ x + i , offset ]
                    baixo = im_bin [x - i , offset ]
                except:
                    cima, baixo = 0 , 0
                
                if cima == 0 and baixo == 0:
                    continue
                pinta = False
                break;
            
            if pinta:
                im_bin[ x , offset ] = 130
                pontos.append( [ x , offset ] )
                
        countPreto = 0
    countPreto = 0
Image.fromarray(np.uint8(im_bin)).save(IMRPATH + 'testeb.png')

newpontos = []
pointsnear = True
for ponto in pontos:
    if isPointNear(ponto,newpontos):
        continue
    newpontos.append(ponto)
        
QUANTQUESTOES = int(sys.argv[2])
# QUANTQUESTOES = 6

divResV = int((height - height/10 - tolerancia)/QUANTQUESTOES)
divResH = int((width - width/10 - tolerancia)/5)

posRes = ['a','b','c','d','e']
respostas = {}
for i in range(QUANTQUESTOES):
    respostas[i+1] = []


for ponto in newpontos:
    for i in range(QUANTQUESTOES+1):
        if ponto[0] > i*divResV:
            continue
        for j in range(5):
            if ponto[1] < (j+1)*divResH:
                respostas[i].append(posRes[j])
                break
        break
    
# Salvar imagem a partir de um array
Image.fromarray(np.uint8(im_bin)).save(IMRPATH + 'teste.png')

json_object_result = json.dumps(respostas, indent=4)
with open(JSONPATH + '/results.json', 'w') as outfile:
        outfile.write(json_object_result)
        
print(json_object_result)