import TestWithToggle from '@/components/test-hoc/TestWithToggle';
import TestWithLoading from '@/components/TestWithLoading';

export default function PageHoc() {
  return (
    <main className="flex flex-col p-4 bg-blue-50 opacity-50">
      <h1 className="text-2xl mb-4">HOC Loading Test - Fixed</h1>
      <TestWithLoading />
      <TestWithToggle />
    </main>
  );
}
