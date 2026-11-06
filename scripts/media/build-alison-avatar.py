import bpy,os,sys
from pathlib import Path
# blender -b --python scripts/media/build-alison-avatar.py -- SOURCE_DIRECTORY OUTPUT.glb
args=sys.argv[sys.argv.index("--")+1:] if "--" in sys.argv else []
if len(args)!=2:raise SystemExit("Provide the downloaded Rocketbox source directory and output GLB path")
source_dir=Path(args[0]).resolve()
output_file=Path(args[1]).resolve()
from mathutils import Vector
bpy.ops.wm.read_factory_settings(use_empty=True)
bpy.ops.import_scene.fbx(filepath=str(source_dir/'Business_Female_01_facial.fbx'))
rig=next(o for o in bpy.data.objects if o.type=='ARMATURE')
mesh=next(o for o in bpy.data.objects if o.type=='MESH')
keep=['AK_09_EyeBlinkLeft','AK_10_EyeBlinkRight','AK_25_JawOpen','AK_44_MouthSmileLeft','AK_45_MouthSmileRight','AA_VI_13_O','AA_VI_11_E']
for key in list(mesh.data.shape_keys.key_blocks)[::-1]:
 if key.name not in keep and key.name!='Basis':mesh.shape_key_remove(key)
for m in mesh.data.materials:
 m.use_nodes=True;n=m.node_tree.nodes;n.clear();out=n.new('ShaderNodeOutputMaterial');bs=n.new('ShaderNodeBsdfPrincipled');m.node_tree.links.new(bs.outputs['BSDF'],out.inputs[0]);bs.inputs['Roughness'].default_value=.78
 path=str(source_dir/m.name)+'_color.tga';im=bpy.data.images.load(path,check_existing=True);im.scale(1024,1024)
 isalpha='opacity' in m.name
 im.filepath_raw=str(source_dir/m.name)+('.png' if isalpha else '.jpg');im.file_format='PNG' if isalpha else 'JPEG';im.save();tex=n.new('ShaderNodeTexImage');tex.image=im;m.node_tree.links.new(tex.outputs['Color'],bs.inputs['Base Color'])
 if isalpha:
  m.node_tree.links.new(tex.outputs['Alpha'],bs.inputs['Alpha']);m.surface_render_method='DITHERED'
 if not isalpha:
  norm=bpy.data.images.load(str(source_dir/m.name)+'_normal.tga',check_existing=True);norm.scale(512,512);norm.filepath_raw=str(source_dir/m.name)+'_normal.jpg';norm.file_format='JPEG';norm.save();norm.colorspace_settings.name='Non-Color';nt=n.new('ShaderNodeTexImage');nt.image=norm;nm=n.new('ShaderNodeNormalMap');nm.inputs['Strength'].default_value=.45;m.node_tree.links.new(nt.outputs['Color'],nm.inputs['Color']);m.node_tree.links.new(nm.outputs['Normal'],bs.inputs['Normal'])
# Matching Rocketbox skeleton; bind the relaxed pose from the supplied animation.
original=set(bpy.data.objects)
bpy.ops.import_scene.fbx(filepath=str(source_dir/'f_idle_neutral_01.fbx'))
other=[o for o in bpy.data.objects if o not in original]
animrig=next(o for o in other if o.type=='ARMATURE')
from mathutils import Matrix
rig.animation_data_clear()
rig.animation_data_create()
rig.animation_data.action=bpy.data.actions.new('Alison relaxed reception')
# Retarget the animation's world rotations; Rocketbox motions use their own rest pose.
for frame in range(1,121,3):
 bpy.context.scene.frame_set(frame)
 for bone in rig.pose.bones:
  source=animrig.pose.bones.get(bone.name)
  if not source:continue
  bpy.context.view_layer.update()
  pos=bone.matrix.translation.copy()
  rot=source.matrix.to_quaternion()
  bone.matrix=Matrix.Translation(pos)@rot.to_matrix().to_4x4()
  bone.keyframe_insert(data_path='rotation_quaternion',frame=frame)
for o in other:bpy.data.objects.remove(o,do_unlink=True)
bpy.context.scene.frame_set(1)
# Keep the idle clip small; facial expression is driven in the client.
bpy.context.scene.frame_start=1;bpy.context.scene.frame_end=120
bpy.ops.object.select_all(action='DESELECT');rig.select_set(True);mesh.select_set(True);bpy.context.view_layer.objects.active=rig
bpy.ops.export_scene.gltf(filepath=str(output_file),export_format='GLB',use_selection=True,export_animations=True,export_frame_range=True,export_force_sampling=True,export_morph=True,export_image_format='AUTO')
print('EXPORTED',os.path.getsize(str(output_file)))
