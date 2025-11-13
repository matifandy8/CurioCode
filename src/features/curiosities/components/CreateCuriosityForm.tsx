import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import { Label } from '@/components/Label';

interface Props {
  onCreated?: (id: number) => void;
}

const CreateCuriosityForm: React.FC<Props> = ({ onCreated }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  type FormValues = { title: string; content: string };
  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormValues>({ mode: 'onTouched' });

  const onSubmit = async (data: FormValues) => {
    setError(null);
    setSuccess(null);
    console.log('CreateCuriosity submit:', data);

    if (!data.title.trim() || !data.content.trim()) {
      setError('Please provide a title and content.');
      return;
    }

    setIsSubmitting(true);
    try {
      // Simulate API call. Replace with real service call when available.
      await new Promise((resolve) => setTimeout(resolve, 700));

      const newId = Math.floor(Math.random() * 100000);
      setSuccess('Curiosity created successfully.');
      reset();

      if (onCreated) onCreated(newId);
    } catch (err) {
      setError((err as Error)?.message || 'Failed to create curiosity. Try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-2xl">
      <div className="mb-4">
        <Label>Title</Label>
        <Input
          {...register('title', { required: 'Title is required' })}
          placeholder="Enter a short, catchy title"
          className="bg-white/5 border-gray-700 text-white"
        />
        {errors.title && <div className="text-sm text-red-500 mt-1">{errors.title.message}</div>}
      </div>

      <div className="mb-4">
        <Label>Content</Label>
        <textarea
          {...register('content', { required: 'Content is required' })}
          placeholder="Tell something curious..."
          className="w-full px-4 py-3 bg-white/5 border border-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-300"
          rows={6}
        />
        {errors.content && <div className="text-sm text-red-500 mt-1">{errors.content.message}</div>}
      </div>

      {error && <div style={{ color: 'crimson', marginBottom: 8 }}>{error}</div>}
      {success && <div style={{ color: 'green', marginBottom: 8 }}>{success}</div>}

      <div className="flex gap-3">
        <Button type="submit" variant="primary" size="md" disabled={isSubmitting}>
          {isSubmitting ? 'Creating...' : 'Create'}
        </Button>
        <Button type="button" variant="secondary" size="md" onClick={() => reset()}>
          Reset
        </Button>
      </div>
    </form>
  );
};

export default CreateCuriosityForm;
