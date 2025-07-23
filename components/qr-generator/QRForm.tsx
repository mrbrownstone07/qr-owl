'use client'

import { useEffect } from 'react'
import { useForm, useWatch, SubmitHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { ZodTypeAny, ZodObject, ZodEnum, ZodBoolean } from 'zod'
import {
    getSchemaByType,
    formDataToQRContent,
    QRFormData,
    QRTypeID,
    QR_TYPE_CONFIGS,
} from '@/lib/qrTypes'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Textarea } from '@/components/ui/textarea'
import {
    Select,
    SelectTrigger,
    SelectContent,
    SelectItem,
    SelectValue,
} from '@/components/ui/select'

// Only include types that have form schemas defined
type SupportedQRTypeID = keyof QRFormData

interface QRFormProps {
    type: SupportedQRTypeID
    onContentGenerated: (qrContent: string) => void
}

type FormFieldRendererProps = {
    name: string
    zodType: ZodTypeAny
    register: any
    errors: any
    control: any
    watchedValues: any
    setValue: (name: string, value: any) => void
}

/**
 * Component for rendering different types of form fields based on Zod schema
 */
const FormFieldRenderer = ({
    name,
    zodType,
    register,
    errors,
    control,
    watchedValues,
    setValue,
}: FormFieldRendererProps) => {
    const typeName = zodType._def.typeName
    const error = errors[name]
    const value = watchedValues[name]

    const formatLabel = (key: string): string => {
        const specialCases: Record<string, string> = {
            ssid: 'Network Name (SSID)',
            url: 'URL',
            vcard: 'vCard',
            sms: 'SMS',
            pdf: 'PDF',
            gps: 'GPS',
        }

        return (
            specialCases[key] ||
            key
                .replace(/([A-Z])/g, ' $1')
                .replace(/^./, (str) => str.toUpperCase())
                .replace(/Id/i, 'ID')
                .replace(/Url/i, 'URL')
        )
    }

    const getInputType = (key: string): string => {
        if (key.toLowerCase().includes('email')) return 'email'
        if (key.toLowerCase().includes('phone')) return 'tel'
        if (key.toLowerCase().includes('url')) return 'url'
        if (key.toLowerCase().includes('amount')) return 'number'
        if (key.toLowerCase().includes('date')) return 'date'
        return 'text'
    }

    // Handle enum types (dropdown select)
    if (typeName === 'ZodEnum') {
        const options = zodType._def.values as string[]
        return (
            <div className="space-y-1">
                <Label htmlFor={name}>{formatLabel(name)}</Label>
                <Select
                    onValueChange={(val) => setValue(name, val)}
                    value={value}
                >
                    <SelectTrigger>
                        <SelectValue placeholder={`Select ${formatLabel(name)}`} />
                    </SelectTrigger>
                    <SelectContent>
                        {options.map((option) => (
                            <SelectItem key={option} value={option}>
                                {option}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
                {error?.message && (
                    <p className="text-sm text-destructive">{error.message.toString()}</p>
                )}
            </div>
        )
    }

    // Handle boolean types (checkbox)
    if (typeName === 'ZodBoolean') {
        return (
            <div className="flex items-center space-x-2">
                <Checkbox
                    id={name}
                    {...register(name)}
                    checked={value}
                    onCheckedChange={(checked) => setValue(name, checked)}
                />
                <Label htmlFor={name}>{formatLabel(name)}</Label>
                {error?.message && (
                    <p className="text-sm text-destructive">{error.message.toString()}</p>
                )}
            </div>
        )
    }

    // Handle textarea for long text fields
    if (['body', 'message', 'note', 'description', 'text'].includes(name.toLowerCase())) {
        return (
            <div className="space-y-1">
                <Label htmlFor={name}>{formatLabel(name)}</Label>
                <Textarea
                    id={name}
                    {...register(name)}
                    placeholder={`Enter ${formatLabel(name)}`}
                    className="min-h-[100px]"
                />
                {error?.message && (
                    <p className="text-sm text-destructive">{error.message.toString()}</p>
                )}
            </div>
        )
    }

    // Default to input field
    return (
        <div className="space-y-1">
            <Label htmlFor={name}>{formatLabel(name)}</Label>
            <Input
                id={name}
                type={getInputType(name)}
                {...register(name)}
                placeholder={`Enter ${formatLabel(name)}`}
            />
            {error?.message && (
                <p className="text-sm text-destructive">{error.message.toString()}</p>
            )}
        </div>
    )
}

/**
 * Main QR Form Component
 */
export const QRForm = ({ type, onContentGenerated }: QRFormProps) => {
    const schema = getSchemaByType(type)
    const typeConfig = QR_TYPE_CONFIGS.find((config) => config.id === type)

    const {
        register,
        handleSubmit,
        reset,
        setValue,
        control,
        formState: { errors, isValid },
    } = useForm({
        resolver: zodResolver(schema),
        mode: 'onChange',
    })

    const watchedValues = useWatch({ control })

    useEffect(() => {
        reset()
    }, [type, reset])

    const onSubmit: SubmitHandler<any> = (data) => {
        const content = formDataToQRContent(type, data as QRFormData[SupportedQRTypeID])
        onContentGenerated(content)
    }

    const shape = (schema as ZodObject<any>).shape as Record<string, ZodTypeAny>

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {typeConfig && (
                <div className="space-y-2">
                    <h3 className="text-lg font-medium">{typeConfig.name}</h3>
                    <p className="text-sm text-muted-foreground">{typeConfig.description}</p>
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.entries(shape).map(([name, zodType]) => (
                    <div
                        key={name}
                        className={[
                            'space-y-1',
                            ['url', 'text', 'body', 'message', 'note', 'description'].includes(
                                name.toLowerCase()
                            )
                                ? 'col-span-full'
                                : '',
                        ].join(' ')}
                    >
                        <FormFieldRenderer
                            name={name}
                            zodType={zodType}
                            register={register}
                            errors={errors}
                            control={control}
                            watchedValues={watchedValues}
                            setValue={setValue}
                        />
                    </div>
                ))}
            </div>

            <div className="flex justify-end">
                <Button
                    type="submit"
                    className="w-full sm:w-auto"
                    disabled={!isValid}
                >
                    Generate QR Code
                </Button>
            </div>
        </form>
    )
}