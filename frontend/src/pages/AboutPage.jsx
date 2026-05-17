import { Building2, ShieldCheck, Users2 } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-3xl mx-auto space-y-12">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight mb-4">About LeaveLo</h1>
          <p className="text-lg text-slate-600 leading-relaxed">
            We are on a mission to simplify human resources for modern enterprises. LeaveLo was built from the ground up to eliminate the friction between employees needing time off and managers needing to ensure operational coverage.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          <div className="text-center p-6 bg-white rounded-2xl border border-slate-100 shadow-sm">
            <div className="w-12 h-12 mx-auto bg-indigo-50 rounded-xl flex items-center justify-center mb-4">
              <Users2 className="w-6 h-6 text-indigo-600" />
            </div>
            <h3 className="text-lg font-semibold text-slate-900 mb-2">Employee First</h3>
            <p className="text-sm text-slate-600">Designed with a consumer-grade experience so Employees actually enjoys using it.</p>
          </div>
          <div className="text-center p-6 bg-white rounded-2xl border border-slate-100 shadow-sm">
            <div className="w-12 h-12 mx-auto bg-indigo-50 rounded-xl flex items-center justify-center mb-4">
              <Building2 className="w-6 h-6 text-indigo-600" />
            </div>
            <h3 className="text-lg font-semibold text-slate-900 mb-2">Enterprise Ready</h3>
            <p className="text-sm text-slate-600">Scalable architecture built to support organizations from 50 to 5,000 employees.</p>
          </div>
          <div className="text-center p-6 bg-white rounded-2xl border border-slate-100 shadow-sm">
            <div className="w-12 h-12 mx-auto bg-indigo-50 rounded-xl flex items-center justify-center mb-4">
              <ShieldCheck className="w-6 h-6 text-indigo-600" />
            </div>
            <h3 className="text-lg font-semibold text-slate-900 mb-2">Secure by Design</h3>
            <p className="text-sm text-slate-600">Bank-level encryption and strict role-based access controls to protect your data.</p>
          </div>
        </div>

        <div className="bg-slate-900 text-white rounded-3xl p-8 md:p-12 text-center">
          <h2 className="text-2xl font-bold mb-4">Join the future of HR</h2>
          <p className="text-slate-300 mb-0 max-w-2xl mx-auto">
            Stop relying on spreadsheets and email threads. Bring your company's leave management into the modern era with a platform that works as hard as your team does.
          </p>
        </div>
      </div>
    </div>
  );
}
