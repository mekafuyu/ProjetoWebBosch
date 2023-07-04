import json
import sys
import math
import numpy as np
from PIL import Image, ImageFilter, ImageOps
from skimage import filters
from skimage.io import imread

IMRPATH = './public/img/results/'
JSONPATH = './src/scripts'
# IMRPATH = '../../public/img/results/'
# JSONPATH = './'

# Imagem passada pelo usuário
IMAGEM = sys.argv[1]
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

# Contador de pretos
countPreto = 0
for x in range( len(im_bin) ):
    for y in range( len(im_bin[0]) ):
        
        if im_bin[x,y] == 0:
            countPreto += 1
            continue;
        
        if countPreto > tolerancia and countPreto < tolerancia * 4:
            
            offset = y - int(countPreto/2)
            pinta = False

            i = 0
            while (cima == 0 or baixo == 0):
                # Try catch pra não explodir quando próximo às extremidades
                try:
                    cima = im_bin[ x + i , offset ]
                    if cima == 0:
                        xcima = x + i
                except:
                    cima = 0
                try:
                    baixo = im_bin [x - i , offset ]
                    if baixo == 0:
                        xbaixo = x + i
                except:
                    baixo = 0         
                    
                if cima == 0 or baixo == 0:
                    continue
                
                pinta = False
                break;
            
            if pinta:
                im_bin[ x , offset ] = 130
                pontos.append( [ x , offset ] )
                
        countPreto = 0
    countPreto = 0
Image.fromarray(np.uint8(im_bin)).save(IMRPATH + 'testeb.png')

def isPointNear(point, newpoints):
    for newpoint in newpoints:
        distancia = int(math.sqrt((point[0]-newpoint[0])**2 + (point[1]-newpoint[1])**2))
        if distancia < tolerancia*3:
            return True
    return False

newpontos = []
pointsnear = True
for ponto in pontos:
    if isPointNear(ponto,newpontos):
        im_bin[ponto[0], ponto[1]] = 0
        continue
    newpontos.append(ponto)

Image.fromarray(np.uint8(im_bin)).save(IMRPATH + 'teste.png')

jsonpontos = {"pontos" : newpontos}
json_object_result = json.dumps(jsonpontos, indent=4)
with open(JSONPATH + '/results.json', 'w') as outfile:
        outfile.write(json_object_result)

print('ok')
