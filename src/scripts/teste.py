import numpy as np
from PIL import Image, ImageFilter, ImageOps
from skimage import filters
from skimage.io import imread, imsave

# Load image as greyscale
img = imread('ofc7.jpeg', as_gray=True)

# Get Otsu threshold - result is 151
threshold = (filters.threshold_otsu(img))
result = (img>threshold).astype(np.uint8) * 255 
imsave('result.png',result)
print(int(threshold*255))

def isNear(ponto1, ponto2):
    # print(ponto1, ponto2)
    if abs(ponto1[0]-ponto2[0]) < tolerancia:
        return True;
thresh = int(threshold*255)
maxval = 255

skip = 5
    
img = Image.open('./ofc7.jpeg').convert('L').filter(ImageFilter.BLUR)
width, height = img.size
img = img.crop((width/12,height/12,width*11/12,height*11/12))


im_gray = np.array(img)

im_bin = (im_gray > thresh) * maxval
metrica = len(im_bin[0])
tolerancia = int(metrica*0.025)
print(im_bin.shape)
print(tolerancia)
pontos = []

# a,b,c,d,e = [0,1,2,3,4]
# gabarito = [a,a,b,c,b,a]
# array = np.zeros((len(gabarito),5))

# for i in range(len(gabarito)):
#         array[i,gabarito[i]] = 255
#         print(gabarito[i])
        


countPreto = 0
for x in range(len(im_bin)):
    for y in range(len(im_bin[0])):
        
        if im_bin[x,y] == 0:
            countPreto += 1
            continue;
        
        if countPreto > tolerancia:
            offset = y-int(countPreto/2)
            # xp, xm = x, x
            pinta = True
            for i in range(tolerancia):
                try:
                    cima = im_bin[x+i,offset]
                    baixo = im_bin[x-i,offset]
                except:
                    cima, baixo = 0,0
                if cima == 0 and baixo == 0:
                    continue
                pinta = False
                break;
            if pinta:
                im_bin[x,offset] = 130
                pontos.append([x,offset])
        countPreto = 0
    countPreto=0
    
    

newpontos = []
for i in range(len(pontos)-1):
    if isNear(pontos[i],pontos[i+1]):
        im_bin[pontos[i][0],pontos[i][1]] = 0
        continue
    newpontos.append(pontos[i])
if len(pontos) != 0:
    newpontos.append(pontos[-1])
    
    


# for x in range(len(im_bin)):
#     for y in range(len(im_bin[0])):
        
#         if im_bin[x,y] == 0:
#             countPreto += 1
#             continue;
#         if countPreto > tolerancia:
#             offset = y-int(countPreto/2)
#             im_bin[x,offset] = 90
#         countPreto = 0
#     countPreto=0
    
print(newpontos)

Image.fromarray(np.uint8(im_bin)).save('./teste.png')
img.save("./teste2.png")

# def first_function():
#     json_obj = open(sys.argv[2])
#     data = json.load(json_obj)
#     calculatedResults = [1,2,4,3] # it is just example of data to return, in fact you will calculate it bellow
#     X = data["X"]
#     y = data["y"]
#     # do some your calculations based on X and y and put the result to the calculatedResults
#     # print(make_pipeline)
#     json_object_result = json.dumps(calculatedResults, indent=4)

#     with open(sys.argv[3], "w") as outfile:
#         outfile.write(json_object_result)
#     print("OK")


# if sys.argv[1] == 'first_function':
#     first_function()

# sys.stdout.flush()
