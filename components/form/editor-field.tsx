/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Box, FormHelperText, Typography } from '@mui/material';
import dynamic from 'next/dynamic';
import { LegacyRef, useCallback, useEffect, useRef } from 'react';
import { Control, FieldValues, Path, useController } from 'react-hook-form';
import ReactQuill, { ReactQuillProps } from 'react-quill';
// import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

// const ReactQuill = dynamic(()=> import('react-quill'), {ssr:false})

interface ReactQuillWrapperPops extends ReactQuillProps {
    forwardedRef: LegacyRef<ReactQuill>
}
const ReactQuillWrapper = dynamic(
    async ()=> {
        const {default: RQ} = await import('react-quill')

        const Component = ({forwardedRef, ...props}: ReactQuillWrapperPops) => {
        return <RQ ref={forwardedRef} {...props} />
        }
    return Component
    }, 
    {ssr:false})

export type EditorFieldProps<N extends FieldValues> = {
    name: Path<N>
    control: Control<N>
    label?: string
}
export function EditorField<N extends FieldValues> ({
        name,
        control,
        label, 
       }: EditorFieldProps<N>) {

    const {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        field: { onChange,  value, ref},
        fieldState: {error}
    } = useController({
        name,
        control
    })

    const editorRef = useRef(null)

    const cloudinaryWidgetRef = useRef(null)

    useEffect(() => {
        function initCloudinaryWidget() {
			// check and retry if cloudinary not ready
			// @ts-ignore
			if (!window.cloudinary) {
				console.log('cloudinary not ready, trigger retry in 500ms')
				setTimeout(initCloudinaryWidget, 500)
				return
			}

			console.log('cloudinary is ready')
		
			// @ts-ignore no type def support yet
			const widget = window.cloudinary.createUploadWidget(
				{
					cloudName: 'ngoanh',
					uploadPreset: 'Ngo_Anh',
					multiple: false, //restrict upload to a single file
					clientAllowedFormats: ['image'], //restrict uploading to image files only
					maxImageFileSize: 3000000, //restrict file size to less than 2MB
					// sources: [ "local", "url"], // restrict the upload sources to URL and local files
					// folder: "user_images", //upload files to the specified folder
					// tags: ["users", "profile"], //add the given tags to the uploaded files
					// context: {alt: "user_uploaded"}, //add the given context data to the uploaded files
					// maxImageWidth: 2000, //Scales the image down to a width of 2000 pixels before uploading
					// theme: "purple", //change to a purple theme
				},
				// @ts-ignore no type support yet
				(error, result) => {
					if (!error && result && result.event === 'success') {
						const quill = editorRef.current
						// @ts-ignore
						const range = quill?.getEditorSelection?.()
						if (quill && range) {
							// @ts-ignore
							quill.getEditor()?.insertEmbed?.(range.index, 'image', result.info?.secure_url)
						}
					}
				}
			)

			cloudinaryWidgetRef.current = widget
		} 	
        initCloudinaryWidget()
	}, [])


	// 	initCloudinaryWidget()
	// }, [])

    const imageHandler = useCallback(() => {
        // @ts-ignore no type support
      if(cloudinaryWidgetRef.current) cloudinaryWidgetRef.current.open?.()
    }, [])
    const modules = {
		toolbar: {
			container: [
				[{ header: [1, 2, 3, 4, 5, false] }],
				[{ color: [] }, { background: [] }],
				['bold', 'italic', 'underline', 'strike', 'blockquote'],
				[{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
				['link', 'image'],
				['clean'],
			],
			handlers: {
				image: imageHandler,
			},
		},
	}

	const formats = [
		'header',
		'bold',
		'italic',
		'underline',
		'strike',
		'blockquote',
		'list',
		'bullet',
		'indent',
		'link',
		'image',
		'color',
		'background',
	]
  return (
    <Box sx={{my:1.5}}>
        <Typography variant='body2'>{label}</Typography>
        <Box>
            <ReactQuillWrapper 
                forwardedRef={editorRef}
                theme='snow' 
                modules={modules} 
                formats={formats}
                value={value}
                onChange={(content)=>{
                    onChange(content)
                }}
            />
        </Box>
        <FormHelperText error={!!error}>{error?.message}</FormHelperText>
    </Box>
    
  );
}
