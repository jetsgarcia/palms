import { readStudents } from "@/actions/student";
import { studentColumns } from "@/components/admin/user-management/student-columns";
import { DataTable } from "@/components/admin/user-management/student-data-table";
import Loader from "@/components/loader";
import { StudentType } from "@/types/student";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function StudentTab() {
  const [students, setStudents] = useState<StudentType[]>([]);
  const [page, setPage] = useState(1);
  const [fetchedPages, setFetchedPages] = useState<number[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Reset all states when component mounts to ensure consistency
    setStudents([]);
    setFetchedPages([]);
    setPage(1);
    setLoading(true);

    async function fetchInitialStudents() {
      try {
        const response = await readStudents(0);

        if (response.ok) {
          setStudents(response.data);
          setFetchedPages([1]);
          setLoading(false);
        } else {
          toast.error(response.message);
          setLoading(false);
        }
      } catch (error) {
        console.error(error);
        toast.error("Failed to fetch students");
        setLoading(false);
      }
    }

    fetchInitialStudents();
  }, []); // Empty dependency array - runs only on mount

  // Separate effect for pagination
  useEffect(() => {
    // Skip for initial page or if we've already fetched this page
    if (page === 1 || fetchedPages.includes(page)) return;

    // Only fetch more data when we need to (at page 4, 9, 14, etc.)
    if ((page - 4) % 5 !== 0) return;

    async function fetchMoreStudents() {
      try {
        const offset = (page + 1) * 10;
        const response = await readStudents(offset);

        if (response.ok) {
          setStudents((prev) => [...prev, ...response.data]);
          setFetchedPages((prev) => [...prev, page]);
        } else {
          toast.error(response.message);
        }
      } catch (error) {
        console.error(error);
        toast.error("Failed to fetch students");
      }
    }

    fetchMoreStudents();
  }, [page, fetchedPages]);

  return (
    <div>
      {loading ? (
        <Loader />
      ) : (
        <DataTable
          columns={studentColumns}
          data={students.map((student) => ({
            serialNumber: student.student.serialNumber,
            firstName: student.firstName,
            middleInitial: student.middleInitial ?? undefined,
            lastName: student.lastName,
            suffix: student.suffix ?? undefined,
            email: student.email,
            rank: student.student.rank,
            course: student.student.courses.name,
            trainingYear: student.student.courses.training_periods.name,
          }))}
          page={page}
          setPage={setPage}
        />
      )}
    </div>
  );
}
