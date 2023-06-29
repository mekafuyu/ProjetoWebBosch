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

# # Função para comparar proximidade dos pontos mais tarde
# def isNear(ponto1, ponto2):
#     distancia = int(math.sqrt((ponto1[0]-ponto2[0])**2 + (ponto1[1]-ponto2[1])**2))
#     if distancia < tolerancia:
#         print(ponto1, ponto2, distancia, '<br>')
#         return True
        
        


# Contador de pretos
countPreto = 0
for x in range( len(im_bin) ):
    for y in range( len(im_bin[0]) ):
        
        if im_bin[x,y] == 0:
            countPreto += 1
            continue;
        
        if countPreto > tolerancia:
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

# print(pontos)

# Filtrar pontos que estão muito próximos
# newpontos = []
# for i in range(len(pontos) - 1):
#     if isNear(pontos[i],pontos[i + 1]):
#         im_bin[pontos[i][0] , pontos[i][1]] = 0
#         continue
#     newpontos.append(pontos[i])
# if len(pontos) != 0:
#     newpontos.append(pontos[-1])
# newpontos = []
# for i in range(len(pontos) - 1):
#     proximos = [pontos[i]]
#     tempi = i
    
#     for j in range(len(pontos) - 1):
#         if isNear(pontos[tempi],pontos[j]):
#             proximos.append(pontos[j])
#             tempi = j
    
#     pc = pontos[math.ceil(len(proximos)/2)]
    
#     for k in range(len(proximos)):
#         im_bin[proximos[k][0], proximos[k][1]] = 0
        
#     im_bin[pc[0], pc[1]] = 130
#     newpontos.append()



print (pontos)

def isPointNear(point, points):
    for i in range(len(points)):
        distancia = int(math.sqrt((point[0]-points[i][0])**2 + (point[1]-points[i][1])**2))
        if distancia < tolerancia:
            return True
    return False

newpontos = []
pointsnear = True
for ponto in pontos:
    if isPointNear(ponto,newpontos):
        continue
    newpontos.append(ponto)
    

    



        
        
# if len(pontos) != 0:
#     newpontos.append(pontos[-1])
# Salvar imagem a partir de um array
Image.fromarray(np.uint8(im_bin)).save(IMRPATH + 'teste.png')

jsonpontos = {"pontos" : newpontos}
json_object_result = json.dumps(jsonpontos, indent=4)
with open(JSONPATH + '/results.json', 'w') as outfile:
        outfile.write(json_object_result)

print('ok')
