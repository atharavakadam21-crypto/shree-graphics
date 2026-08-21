import InquiryTable from "@/components/admin/InquiryTable";

export default function InquiriesPage() {
  return (
    <main className="min-h-screen bg-[#F5F5F4]">

      <div className="mx-auto max-w-[1600px] px-4 py-6 sm:px-6 lg:px-8 lg:py-8">

        {/* Page heading */}

        <div className="mb-8">

          <div className="flex items-center gap-3">

            <span className="h-2 w-2 rounded-full bg-[#F5820C]" />

            <span className="text-xs font-bold uppercase tracking-[0.18em] text-[#2E1A6B]">
              Shree Graphics / CRM
            </span>

          </div>

          <h1 className="mt-3 text-3xl font-black tracking-tight text-zinc-900 sm:text-4xl">
            Inquiries
          </h1>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-zinc-500 sm:text-base">
            Manage customer enquiries submitted through the
            Shree Graphics website and quickly contact
            potential customers.
          </p>

        </div>

        <InquiryTable />

      </div>

    </main>
  );
}