'use client'

import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { ZodTypeAny, ZodObject } from 'zod'

import {
    getSchemaByType,
    formDataToQRContent,
    QRFormData,
    QRTypeID,
} from '@/lib/qrTypes'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import {
    Select,
    SelectTrigger,
    SelectContent,
    SelectItem,
    SelectValue,
} from '@/components/ui/select'

interface Props {
    type: QRTypeID
    onContentGenerated: (qrContent: string) => void
}

export default function QRForm({ type, onContentGenerated }: Props) {
    const schema = getSchemaByType(type)

    const {
        register,
        handleSubmit,
        reset,
        setValue,
        formState: { errors },
        watch,
    } = useForm({
        resolver: zodResolver(schema),
        mode: 'onChange',
    })

    useEffect(() => {
        reset()
    }, [type, reset])

    const onSubmit = (data: QRFormData[QRTypeID]) => {
        const content = formDataToQRContent(type, data)
        onContentGenerated(content)
    }

    const shape = (schema as ZodObject<any>).shape as Record<string, ZodTypeAny>

    const formatLabel = (key: string) =>
        key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
                {Object.entries(shape).map(([key, val]) => {
                    const error = errors[key as keyof typeof errors]
                    const label = formatLabel(key)
                    const typeName = val._def.typeName

                    // Enum → Select
                    if (typeName === 'ZodEnum') {
                        const options = val._def.values as string[]
                        return (
                            <div key={key} className="col-span-full space-y-1">
                                <Label htmlFor={key}>{label}</Label>
                                <Select
                                    onValueChange={(v) => setValue(key, v)}
                                    defaultValue={watch(key)}
                                >
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder={`Select ${label}`} />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {options.map((opt) => (
                                            <SelectItem key={opt} value={opt}>
                                                {opt}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                {typeof error?.message === 'string' && (
                                    <p className="text-sm text-destructive">{error.message}</p>
                                )}
                            </div>
                        )
                    }

                    // Boolean → Checkbox
                    if (typeName === 'ZodBoolean') {
                        return (
                            <div key={key} className="col-span-full flex items-center space-x-2">
                                <Checkbox id={key} {...register(key)} />
                                <Label htmlFor={key}>{label}</Label>
                            </div>
                        )
                    }

                    // Fallback → Text input
                    return (
                        <div key={key} className="space-y-1">
                            <Label htmlFor={key}>{label}</Label>
                            <Input
                                id={key}
                                {...register(key)}
                                placeholder={`Enter ${label}`}
                                className="w-full"
                            />
                            {typeof error?.message === 'string' && (
                                <p className="text-sm text-destructive">{error.message}</p>
                            )}
                        </div>
                    )
                })}
            </div>

            <div className="flex justify-end">
                <Button type="submit" className="w-full sm:w-auto">
                    Generate QR
                </Button>
            </div>
        </form>
    )
}
